/**
 * Client-side news fetching utility
 *
 * Fetches news directly from WordPress in the browser.
 * This replaces the server-side /api/news route so the site
 * can be fully static (output: "export") and not depend on
 * the serverless function being available.
 */

export interface NewsItem {
  title: string;
  link: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

// In-memory cache for the session
let cachedNews: NewsItem[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Persistent image URL cache (by post link)
const imageUrlCache: Record<string, string> = {};

function categorize(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("press release")) return "Press Release";
  if (lower.includes("trokosi")) return "Human Rights";
  if (lower.includes("tournament") || lower.includes("sports") || lower.includes("marathon"))
    return "Sports";
  if (lower.includes("award") || lower.includes("honored") || lower.includes("honoured"))
    return "Award";
  if (lower.includes("investigation") || lower.includes("voodoo") || lower.includes("shrine"))
    return "Investigation";
  if (lower.includes("caution") || lower.includes("warn")) return "Advocacy";
  if (lower.includes("peace") || lower.includes("reconcil")) return "Peacebuilding";
  if (lower.includes("education") || lower.includes("school") || lower.includes("scholarship"))
    return "Education";
  return "Duamenefa News";
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Fetch with timeout and retry
async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        // Check if the response is actually valid JSON (not bot protection page)
        const cloned = response.clone();
        const text = await cloned.text();
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed) || (parsed && parsed.id)) {
            return response;
          }
        } catch {
          // Not valid JSON, retry
        }
      }

      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw new Error("All retry attempts failed");
}

// Method 1: WordPress REST API with _embed
async function fetchNewsWithEmbed(): Promise<NewsItem[]> {
  const url = "https://fafaafmonline.com/wp-json/wp/v2/posts?categories=9&per_page=9&_embed";

  const response = await fetchWithRetry(url);
  if (!response.ok) throw new Error(`WP REST API returned ${response.status}`);

  const posts = await response.json();
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error("WP REST API returned no posts");
  }

  return posts.map((post: any) => {
    let image = "/radio-broadcast.jpg";
    try {
      const media = post._embedded?.["wp:featuredmedia"]?.[0];
      if (media && media.media_details) {
        const sizes = media.media_details.sizes;
        image =
          sizes?.medium_large?.source_url ||
          sizes?.large?.source_url ||
          sizes?.medium?.source_url ||
          media.source_url ||
          "/radio-broadcast.jpg";
      }
    } catch {
      // fallback image
    }

    const title = stripHtml(post.title?.rendered || "").trim();
    const excerpt = stripHtml(post.excerpt?.rendered || "").trim();

    return {
      title: title || "Untitled",
      link: post.link || "#",
      excerpt:
        excerpt.length > 200
          ? excerpt.substring(0, 197) + "..."
          : excerpt || title.substring(0, 100) + "...",
      date: formatDate(post.date || ""),
      image,
      category: categorize(title),
    };
  });
}

// Method 2: WordPress REST API without _embed, fetch media separately
async function fetchNewsWithoutEmbed(): Promise<NewsItem[]> {
  const url = "https://fafaafmonline.com/wp-json/wp/v2/posts?categories=9&per_page=9";

  const response = await fetchWithRetry(url);
  if (!response.ok) throw new Error(`WP REST API (no embed) returned ${response.status}`);

  const posts = await response.json();
  if (!Array.isArray(posts) || posts.length === 0) {
    throw new Error("WP REST API (no embed) returned no posts");
  }

  // Fetch media separately
  const mediaIds = posts
    .filter((p: any) => p.featured_media)
    .map((p: any) => p.featured_media);

  let mediaMap: Record<number, string> = {};
  if (mediaIds.length > 0) {
    try {
      const mediaUrl = `https://fafaafmonline.com/wp-json/wp/v2/media?include=${mediaIds.join(",")}&_fields=id,source_url,media_details`;
      const mediaResponse = await fetchWithRetry(mediaUrl, 1);
      if (mediaResponse.ok) {
        const mediaItems = await mediaResponse.json();
        if (Array.isArray(mediaItems)) {
          mediaItems.forEach((m: any) => {
            const sizes = m.media_details?.sizes;
            mediaMap[m.id] =
              sizes?.medium_large?.source_url ||
              sizes?.medium?.source_url ||
              m.source_url ||
              "/radio-broadcast.jpg";
          });
        }
      }
    } catch {
      // Media fetch failed
    }
  }

  return posts.map((post: any) => {
    const title = stripHtml(post.title?.rendered || "").trim();
    const excerpt = stripHtml(post.excerpt?.rendered || "").trim();

    return {
      title: title || "Untitled",
      link: post.link || "#",
      excerpt:
        excerpt.length > 200
          ? excerpt.substring(0, 197) + "..."
          : excerpt || title.substring(0, 100) + "...",
      date: formatDate(post.date || ""),
      image: mediaMap[post.featured_media] || "/radio-broadcast.jpg",
      category: categorize(title),
    };
  });
}

// Method 3: RSS feed (most resilient, limited images)
async function fetchNewsViaRSS(): Promise<NewsItem[]> {
  const rssUrl = "https://fafaafmonline.com/category/duamenefa-news/feed/";

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  let response: Response;
  try {
    response = await fetch(rssUrl, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) throw new Error(`RSS feed returned ${response.status}`);

  const xml = await response.text();
  const items: NewsItem[] = [];

  const itemRegex = /<item[\s\S]*?<\/item>/gi;
  const itemMatches = xml.match(itemRegex);
  if (!itemMatches) throw new Error("Could not parse RSS feed items");

  for (let i = 0; i < Math.min(itemMatches.length, 9); i++) {
    const item = itemMatches[i];

    const titleMatch =
      item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
      item.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/i);
    const descMatch =
      item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i) ||
      item.match(/<description>([\s\S]*?)<\/description>/i);
    const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const imgMatch =
      item.match(/<media:content[^>]*url="([^"]+)"/i) ||
      item.match(/<enclosure[^>]*url="([^"]+)"/i);
    const contentMatch = item.match(
      /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/i
    );

    let image = "/radio-broadcast.jpg";
    if (imgMatch) {
      image = imgMatch[1];
    } else if (contentMatch) {
      const contentImgMatch = contentMatch[1].match(/<img[^>]+src=["']([^"']+)["']/i);
      if (contentImgMatch) image = contentImgMatch[1];
    }

    const title = titleMatch ? stripHtml(titleMatch[1]).trim() : "";
    if (!title || title.length < 5) continue;

    const link = linkMatch ? linkMatch[1].trim() : "#";
    const excerpt = descMatch ? stripHtml(descMatch[1]).trim() : "";
    const date = dateMatch ? formatDate(dateMatch[1].trim()) : "";

    items.push({
      title,
      link,
      excerpt:
        excerpt.length > 200
          ? excerpt.substring(0, 197) + "..."
          : excerpt || title.substring(0, 100) + "...",
      date,
      image,
      category: categorize(title),
    });
  }

  return items;
}

/**
 * Main function: Fetch news with 3-tier fallback
 * Call this from client components (useEffect, etc.)
 */
export async function fetchNews(): Promise<NewsItem[]> {
  // Check session cache first
  const now = Date.now();
  if (cachedNews.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedNews;
  }

  let items: NewsItem[] = [];
  let method = "unknown";

  const methods: { name: string; fn: () => Promise<NewsItem[]> }[] = [
    { name: "wp-rest-api-embed", fn: fetchNewsWithEmbed },
    { name: "wp-rest-api-no-embed", fn: fetchNewsWithoutEmbed },
    { name: "rss-feed", fn: fetchNewsViaRSS },
  ];

  for (const { name, fn } of methods) {
    try {
      items = await fn();
      if (items.length > 0) {
        method = name;
        console.log(`[News] Fetched ${items.length} items via ${name}`);
        break;
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.warn(`[News] Method ${name} failed: ${msg}`);
    }
  }

  if (items.length > 0) {
    // Update image URL cache
    for (const item of items) {
      if (item.image && item.image !== "/radio-broadcast.jpg") {
        imageUrlCache[item.link] = item.image;
      }
    }
    // Fill fallback images from cache
    for (const item of items) {
      if (item.image === "/radio-broadcast.jpg" && imageUrlCache[item.link]) {
        item.image = imageUrlCache[item.link];
      }
    }

    cachedNews = items;
    lastFetchTime = now;
  }

  // Return cached news even if stale
  if (items.length === 0 && cachedNews.length > 0) {
    return cachedNews;
  }

  return items;
}
