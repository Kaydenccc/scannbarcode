// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // ...
  const token = request.cookies.get('token');
  console.log(token);

  if (!token || token.value === 'undefined') {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/profile', '/'], // Routes yang memerlukan middleware
};
