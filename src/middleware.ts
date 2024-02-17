// client/src/middleware.ts

import {
  getSession,
  withMiddlewareAuthRequired,
} from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return;
  }
  if (req.nextUrl.pathname.startsWith('/private')) {
    return;
  }

  if (req.nextUrl.pathname.startsWith('/api/private-route')) {
    return;
  }

  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  });

  const user = await getSession(req, response);
  const token = user?.accessToken;

  response.headers.set('Authorization', `Bearer ${token}`);
  response.headers.set('path', `${req.nextUrl.pathname}`);

  return response;
});

export const config = {
  matcher: ['/private/:path*', '/api/:path*'],
};
