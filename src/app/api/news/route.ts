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

// In-memory cache for news (refreshed every 30 min)
let cachedNews: NewsItem[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

function parseNewsFromHtml(html: string): NewsItem[] {
  const items: NewsItem[] = [];

  // Split HTML by post blocks - each article starts with class="post-XXXXX
  const postBlocks = html.split(/class="post-\d+\s/);

  for (let i = 1; i < postBlocks.length && items.length < 9; i++) {
    const block = postBlocks[i];

    // Extract background-image URL
    const bgImgMatch = block.match(/background-image:\s*url\(['"]([^'"]+)['"]\)/i);
    const image = bgImgMatch ? bgImgMatch[1] : "/radio-broadcast.jpg";

    // Extract title and link from entry-title
    const titleMatch = block.match(
      /<h[12][^>]*class="entry-title"[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h[12]>/i
    );
    if (!titleMatch) continue;

    const link = titleMatch[1];
    const title = stripHtml(titleMatch[2]).trim();

    if (!title || title.length < 5) continue;

    // Extract date from date div
    const dateMatch = block.match(/<div\s+class="date"[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/i);
    const dateStr = dateMatch ? stripHtml(dateMatch[1]).trim() : "";
    const date = dateStr ? formatDate(dateStr) : "";

    // Extract excerpt from entry-content
    const excerptMatch = block.match(
      /<div[^>]*class="entry-content"[^>]*>\s*<p>([\s\S]*?)<\/p>/i
    );
    const excerpt = excerptMatch ? stripHtml(excerptMatch[1]).trim() : "";

    items.push({
      title,
      link,
      excerpt: excerpt.length > 200 ? excerpt.substring(0, 197) + "..." : (excerpt || title.substring(0, 100) + "..."),
      date,
      image,
      category: categorize(title),
    });
  }

  return items;
}

async function fetchNewsViaPageReader(): Promise<NewsItem[]> {
  const ZAI = (await import("z-ai-web-dev-sdk")).default;
  const zai = await ZAI.create();

  const pageResult = await zai.functions.invoke("page_reader", {
    url: "https://fafaafmonline.com/category/duamenefa-news/",
  });

  if (pageResult.code !== 200 || !pageResult.data?.html) {
    throw new Error(`Page reader failed with code ${pageResult.code}`);
  }

  return parseNewsFromHtml(pageResult.data.html);
}

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedNews.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      return NextResponse.json({
        news: cachedNews,
        updated: new Date(lastFetchTime).toISOString(),
        cached: true,
      });
    }

    const items = await fetchNewsViaPageReader();
    console.log("[News API] Fetched items:", items.length);

    if (items.length > 0) {
      cachedNews = items;
      lastFetchTime = now;
      return NextResponse.json({ news: items, updated: new Date().toISOString() });
    }

    // Return cached news even if stale
    if (cachedNews.length > 0) {
      return NextResponse.json({
        news: cachedNews,
        updated: new Date(lastFetchTime).toISOString(),
        cached: true,
      });
    }

    return NextResponse.json({ news: [], updated: new Date().toISOString() });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[News API] Error:", errorMessage);

    // Return cached news if available
    if (cachedNews.length > 0) {
      return NextResponse.json({
        news: cachedNews,
        updated: new Date(lastFetchTime).toISOString(),
        cached: true,
      });
    }

    return NextResponse.json(
      { news: [], error: errorMessage, updated: new Date().toISOString() },
      { status: 200 }
    );
  }
}
