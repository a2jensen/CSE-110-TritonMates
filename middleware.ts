import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  console.log("RUNNING MIDDLEWARE REQUEST")

  if (!token) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Validate the token using Firebase REST API
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      }
    );

    const data = await response.json();
    console.log("middleware data response", data)
    if (!data.users || data.error) {
      // Invalid token: redirect to login
      console.log("invalid case reached in middleware")
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Token is valid, proceed with the request
    console.log("token is valid, case of proceeding with request")
    return NextResponse.next();
  } catch (error) {
    console.error('Error validating Firebase token:', error);
    // Redirect to login on error
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/path', 
    '/rooms/:path*',
    '/user',
    '/dashboard/:path*'
  ]
};
