---
Task ID: 2
Agent: Main Agent
Task: Fix "Unable to load news" error - rewrite news API route

Work Log:
- Diagnosed that the old API route used z-ai-web-dev-sdk page_reader which was unreliable
- Confirmed WordPress REST API at fafaafmonline.com/wp-json/wp/v2/posts works correctly
- Discovered Next.js fetch caching was causing stale/failed responses (cache: "no-store" fix)
- Discovered WordPress site has intermittent Imunify360 bot protection blocking API requests
- Rewrote /api/news/route.ts with three fallback methods:
  1. WP REST API with _embed (primary - includes featured images)
  2. WP REST API without _embed + separate media fetch (secondary)
  3. RSS feed (most resilient fallback)
- Added retry logic with exponential backoff for bot protection issues
- Added persistent image URL cache (survives across news refreshes)
- Added image fallback error handler in HomePage.tsx (onError -> /radio-broadcast.jpg)
- Tested in both dev and standalone production builds - both return 9 news items with images

Stage Summary:
- News API now reliably returns 9 items with featured images
- Three fallback methods ensure maximum reliability
- Image URL cache persists across requests so images survive even if _embed is blocked
- Production build verified working

