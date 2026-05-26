/**
 * Duamenefa Foundation Service Worker
 *
 * Handles serverless platform cold-start errors ("function is pending state")
 * by intercepting navigation requests and auto-retrying when the platform
 * returns PreconditionFailed JSON instead of HTML.
 */

const CACHE_NAME = 'duamenefa-v1';
const FALLBACK_URL = '/index-fallback.html';
const MAX_RETRIES = 5;
const BASE_RETRY_DELAY = 2000; // 2 seconds

/**
 * Check if a response is a serverless platform "pending state" error
 */
function isPlatformPendingError(response) {
  if (!response) return false;
  const contentType = response.headers.get('content-type') || '';
  // Platform errors come as application/json, not text/html
  if (contentType.includes('application/json')) {
    return true;
  }
  // Also check for non-HTML responses that might be the error
  if (!contentType.includes('text/html') && response.status !== 200) {
    return true;
  }
  return false;
}

/**
 * Check if response body contains the platform error
 */
async function checkPlatformError(response) {
  try {
    const cloned = response.clone();
    const text = await cloned.text();
    if (text.includes('PreconditionFailed') || text.includes('pending state') || text.includes('function is pending')) {
      return true;
    }
    // Also check if it's raw JSON that doesn't look like our app
    if (text.startsWith('{') && text.includes('"Code"') && text.includes('"Message"')) {
      return true;
    }
  } catch (e) {
    // Can't read response, assume it's ok
  }
  return false;
}

/**
 * Retry a request with exponential backoff
 */
async function retryRequest(request, retryCount = 0) {
  if (retryCount >= MAX_RETRIES) {
    return null;
  }

  const delay = BASE_RETRY_DELAY * Math.pow(1.5, retryCount);
  await new Promise(resolve => setTimeout(resolve, delay));

  try {
    const response = await fetch(request);
    if (await checkPlatformError(response)) {
      return retryRequest(request, retryCount + 1);
    }
    return response;
  } catch (error) {
    return retryRequest(request, retryCount + 1);
  }
}

/**
 * Get a cached version of the page or the fallback
 */
async function getCachedResponse(request) {
  const cache = await caches.open(CACHE_NAME);

  // Try to find a cached HTML response
  const cachedResponse = await cache.match(request);
  if (cachedResponse && cachedResponse.headers.get('content-type')?.includes('text/html')) {
    return cachedResponse;
  }

  // Try the root page cache for any navigation request
  if (request.mode === 'navigate') {
    const rootCache = await cache.match('/');
    if (rootCache && rootCache.headers.get('content-type')?.includes('text/html')) {
      return rootCache;
    }
  }

  // Fall back to the static fallback page
  const fallbackResponse = await cache.match(FALLBACK_URL);
  if (fallbackResponse) {
    return fallbackResponse;
  }

  // Last resort: try to fetch the fallback page
  try {
    const fallback = await fetch(FALLBACK_URL);
    if (fallback.ok) {
      cache.put(FALLBACK_URL, fallback.clone());
      return fallback;
    }
  } catch (e) {
    // Can't fetch fallback
  }

  return null;
}

// Install event - cache the fallback page and key assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        FALLBACK_URL,
        '/',
        '/logo.jpg',
        '/favicon.png',
      ]).catch(() => {
        // Some resources might not be available yet, that's ok
        return cache.add(FALLBACK_URL).catch(() => {});
      });
    })
  );
  // Activate immediately without waiting
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - intercept requests
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle navigation requests (page loads) - don't interfere with API calls or assets
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try the network first
          const response = await fetch(request);

          // Check if we got a platform error
          if (await checkPlatformError(response)) {
            // Auto-retry the request
            const retriedResponse = await retryRequest(request);
            if (retriedResponse && !(await checkPlatformError(retriedResponse))) {
              // Cache the successful response
              const cache = await caches.open(CACHE_NAME);
              cache.put(request, retriedResponse.clone());
              return retriedResponse;
            }

            // All retries failed, serve cached version
            const cachedResponse = await getCachedResponse(request);
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return a branded error page as last resort
            return new Response(
              `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Duamenefa Foundation - Starting Up</title><style>body{display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;background:#0B3C5D;color:#fff;text-align:center;padding:2rem;margin:0}.container{max-width:500px}.icon{font-size:3rem;margin-bottom:1rem;animation:pulse 2s ease-in-out infinite}h1{font-size:1.5rem;margin-bottom:.5rem;color:#D4AF37}p{color:rgba(255,255,255,.7);margin-bottom:1.5rem;line-height:1.6}button{background:#D4AF37;color:#0B3C5D;border:none;padding:.75rem 2rem;border-radius:.5rem;font-size:1rem;font-weight:600;cursor:pointer}button:hover{background:#c9a22e}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}</style></head><body><div class="container"><div class="icon">\u23F3</div><h1>Server is Starting Up</h1><p>The Duamenefa Foundation website is initializing. This usually takes a few seconds after a new deployment. The page will reload automatically.</p><button onclick="location.reload()">Try Again</button></div><script>var c=parseInt(sessionStorage.getItem('__sw_retry')||'0',10);if(c<10){sessionStorage.setItem('__sw_retry',String(c+1));setTimeout(function(){location.reload()},3000)}else{sessionStorage.removeItem('__sw_retry')}</script></body></html>`,
              {
                status: 503,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
              }
            );
          }

          // Success - cache the response
          if (response.ok && response.headers.get('content-type')?.includes('text/html')) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
          }

          return response;
        } catch (error) {
          // Network error - try cache
          const cachedResponse = await getCachedResponse(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return error page
          return new Response(
            `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Duamenefa Foundation - Offline</title><style>body{display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;background:#0B3C5D;color:#fff;text-align:center;padding:2rem;margin:0}.container{max-width:500px}h1{font-size:1.5rem;margin-bottom:.5rem;color:#D4AF37}p{color:rgba(255,255,255,.7);margin-bottom:1.5rem;line-height:1.6}button{background:#D4AF37;color:#0B3C5D;border:none;padding:.75rem 2rem;border-radius:.5rem;font-size:1rem;font-weight:600;cursor:pointer}button:hover{background:#c9a22e}</style></head><body><div class="container"><h1>You're Offline</h1><p>The Duamenefa Foundation website cannot be reached right now. Please check your internet connection and try again.</p><button onclick="location.reload()">Try Again</button></div></body></html>`,
            {
              status: 503,
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
          );
        }
      })()
    );
  }

  // For API requests, add retry logic for platform errors
  if (request.url.includes('/api/')) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);

          // Check if API returned a platform error
          if (await checkPlatformError(response)) {
            const retriedResponse = await retryRequest(request, 0);
            if (retriedResponse && !(await checkPlatformError(retriedResponse))) {
              return retriedResponse;
            }
            // Return a proper API error response
            return new Response(
              JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.', retry: true }),
              {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
              }
            );
          }

          return response;
        } catch (error) {
          return new Response(
            JSON.stringify({ error: 'Network error. Please check your connection.', retry: true }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      })()
    );
    return;
  }

  // For all other requests (static assets), try network first, then cache
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        return new Response('', { status: 404 });
      }
    })()
  );
});
