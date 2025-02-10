import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Get the token from cookies (or another source, such as headers)
  const token = req.cookies.get('auth_token');
  console.log('Token:', token);
  // List of protected routes
  const protectedRoutes = ['/admin'];

  // If accessing a protected route without a token, redirect to login
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    const loginUrl = new URL('/login', req.url); // Redirect to login
    return NextResponse.redirect(loginUrl);
  }

  // Allow access if authenticated
  return NextResponse.next();
}

// Apply middleware to these routes
export const config = {
  matcher: ['/admin/:path*'], // Protect all /admin routes
};
