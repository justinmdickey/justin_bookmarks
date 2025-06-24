import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip auth check for login page, API routes, and main bookmarks page
  if (request.nextUrl.pathname === '/login' || 
      request.nextUrl.pathname.startsWith('/api/') ||
      request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Check for auth cookie for all other routes
  const authCookie = request.cookies.get('auth-token');
  const isAuthenticated = authCookie?.value === 'authenticated';

  if (!isAuthenticated) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (images, icons, manifest files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$|.*\\.webmanifest$).*)',
  ],
};