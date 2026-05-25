---
Task ID: 3
Agent: Main Agent
Task: Fix "PreconditionFailed - function is pending state" error showing raw JSON on deployed page

Work Log:
- Identified the error as a platform-level cold-start issue where serverless function hasn't initialized
- The error {"Code":"PreconditionFailed","Message":"function is pending state, please try later"} replaces entire page
- Added inline script in layout.tsx <head> to detect PreconditionFailed JSON and auto-retry (up to 5 times with backoff)
- Added branded fallback page when retries exhausted (shows "Server is Starting Up" with retry button)
- Updated Caddyfile to intercept backend HTTP errors (500/502/503/504) and serve branded retry page
- Added Next.js error.tsx for graceful React-level error handling
- Added frontend retry logic in HomePage.tsx for news API (handles platform errors, non-JSON responses, up to 3 retries)
- Created static fallback HTML page at public/index-fallback.html
- Rebuilt and verified production build passes

Stage Summary:
- Platform-level cold start errors now handled gracefully with auto-retry
- Users see branded "Server is Starting Up" message instead of raw JSON
- Auto-reload after 5 seconds on error page, with manual "Try Again" button
- Caddy intercepts backend failures with branded HTML fallback
- News API fetch has robust retry logic with error detection

