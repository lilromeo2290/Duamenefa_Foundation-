import { NextResponse } from "next/server";

interface NewsItem {
  title: string;
  link: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

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

export async function GET() {
  try {
    // Use WordPress REST API to get posts with featured images
    const postsUrl = "https://fafaafmonline.com/wp-json/wp/v2/posts?categories=9&per_page=9&_embed";

    const postsResponse = await fetch(postsUrl, {
      next: { revalidate: 1800 }, // Cache for 30 minutes
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
    });

    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.status}`);
    }

    const posts = await postsResponse.json();

    // Collect featured media IDs that need fetching
    const mediaIds: number[] = [];
    const mediaMap: Record<number, string> = {};

    for (const post of posts as Record<string, unknown>[]) {
      const fm = post.featured_media;
      if (fm && typeof fm === "number" && !mediaMap[fm]) {
        mediaIds.push(fm);
      }
    }

    // Fetch all featured media in parallel
    if (mediaIds.length > 0) {
      const mediaPromises = mediaIds.map(async (id) => {
        try {
          const mediaRes = await fetch(
            `https://fafaafmonline.com/wp-json/wp/v2/media/${id}`,
            {
              next: { revalidate: 3600 },
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json",
              },
            }
          );
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json();
            mediaMap[id] = (mediaData as Record<string, unknown>).source_url as string || "/radio-broadcast.jpg";
          }
        } catch {
          // Silently skip failed media fetches
        }
      });

      await Promise.all(mediaPromises);
    }

    // Build news items
    const items: NewsItem[] = (posts as Record<string, unknown>[]).map((post) => {
      const titleObj = post.title as Record<string, string> | undefined;
      const excerptObj = post.excerpt as Record<string, string> | undefined;
      const title = stripHtml(titleObj?.rendered || "");
      const excerpt = stripHtml(excerptObj?.rendered || "");
      const featuredMedia = post.featured_media as number;

      return {
        title,
        link: post.link as string,
        excerpt: excerpt.length > 200 ? excerpt.substring(0, 197) + "..." : excerpt,
        date: formatDate(post.date as string),
        image: featuredMedia ? (mediaMap[featuredMedia] || "/radio-broadcast.jpg") : "/radio-broadcast.jpg",
        category: categorize(title),
      };
    });

    return NextResponse.json({ news: items, updated: new Date().toISOString() });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("News fetch error:", errorMessage);

    // Fallback: try RSS feed
    try {
      const feedUrl = "https://fafaafmonline.com/category/duamenefa-news/feed/";
      const feedResponse = await fetch(feedUrl, {
        next: { revalidate: 1800 },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (!feedResponse.ok) {
        throw new Error(`RSS fallback also failed: ${feedResponse.status}`);
      }

      const xml = await feedResponse.text();
      const items: NewsItem[] = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let match;

      while ((match = itemRegex.exec(xml)) !== null) {
        const itemXml = match[1];
        const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/i);
        const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
        const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i);
        const descMatch = itemXml.match(
          /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>|<description>([\s\S]*?)<\/description>/i
        );

        const title = titleMatch ? (titleMatch[1] || titleMatch[2] || "").trim() : "";
        const link = linkMatch ? linkMatch[1].trim() : "";
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : "";
        const description = descMatch ? (descMatch[1] || descMatch[2] || "").trim() : "";

        if (title && link) {
          const cleanExcerpt = stripHtml(description);
          const postIdx = cleanExcerpt.indexOf("The post ");
          const finalExcerpt = postIdx > 0 ? cleanExcerpt.substring(0, postIdx).trim() : cleanExcerpt;

          items.push({
            title,
            link,
            excerpt: finalExcerpt.length > 200 ? finalExcerpt.substring(0, 197) + "..." : finalExcerpt,
            date: formatDate(pubDate),
            image: "/radio-broadcast.jpg",
            category: categorize(title),
          });
        }

        if (items.length >= 9) break;
      }

      return NextResponse.json({ news: items, updated: new Date().toISOString() });
    } catch (fallbackError: unknown) {
      const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : "Unknown fallback error";
      console.error("News fallback error:", fallbackMessage);
      return NextResponse.json(
        { news: [], error: errorMessage, updated: new Date().toISOString() },
        { status: 200 }
      );
    }
  }
}
