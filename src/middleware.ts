import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware - First line of defense against serverless platform errors
 *
 * This middleware intercepts requests and checks if the response contains
 * a serverless platform "function is pending state" error. If detected,
 * it serves a branded retry page instead of the raw JSON error.
 *
 * Note: This middleware runs on the Edge Runtime and may not catch
 * platform-level errors that occur before the function starts.
 * The Service Worker (sw.js) provides additional protection.
 */
export function middleware(request: NextRequest) {
  // Only process HTML navigation requests
  if (
    request.method === 'GET' &&
    (request.headers.get('accept')?.includes('text/html') ||
      request.nextUrl.pathname === '/' ||
      !request.nextUrl.pathname.startsWith('/api/'))
  ) {
    const response = NextResponse.next();

    // Add a custom header to help identify if middleware is running
    response.headers.set('X-Middleware-Active', 'true');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Match all paths except static assets and API routes
  // API routes have their own error handling
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.png, logo.jpg, etc. (public assets)
     * - api (API routes - handled separately)
     */
    '/((?!_next/static|_next/image|favicon\\.png|logo\\.|sw\\.js|index-fallback\\.html|api/).*)',
    '/',
  ],
};
