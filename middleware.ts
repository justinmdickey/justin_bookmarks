import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip auth check for login page and API routes
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for auth cookie
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
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};