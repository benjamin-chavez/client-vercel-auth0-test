// client/src/middleware.ts

import {
  getSession,
  withMiddlewareAuthRequired,
} from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(
  request: NextRequest
) {
  // if (req.nextUrl.pathname.startsWith('/api/auth')) {
  //   return;
  // }
  // if (req.nextUrl.pathname.startsWith('/private')) {
  //   return;
  // }

  // if (req.nextUrl.pathname.startsWith('/api/private-route')) {
  //   return;
  // }

  // const response = NextResponse.next({
  //   request: {
  //     headers: new Headers(req.headers),
  //   },
  // });

  // response.headers.set('Authorization', `Bearer ${token}`);
  // response.headers.set('path', `${req.nextUrl.pathname}`);

  // return response;
  // const session = await getSession();
  // const user = session ? session.user : null;

  //   // const requestHeaders = new Headers(request.headers);
  //   // const response = NextResponse.next({
  //   //   request: {
  //   //     // New request headers
  //   //     headers: requestHeaders,
  //   //   },
  //   // });
  //   // const user = await getSession(request, response);
  //   // const token = user?.accessToken;
  //   // requestHeaders.set('x-hello-from-middleware1', `hello-Bearer ${token}`);
  //   // requestHeaders.set('Authorization', `Bearer ${token}`);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');
  const user = await getSession(
    request,
    NextResponse.next({
      // const user = session ? session.user : null;
      request: {
        // New request headers
        headers: requestHeaders,
      },
    })
  );
  const keys = Object.keys(user);
  requestHeaders.set('x-hello-from-middleware3', 'hello');
  requestHeaders.set('x-hello-from-middlewarezzz', `${keys}`);

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    // const user = session ? session.user : null;
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  requestHeaders.set('x-hello-from-middleware4', 'hello');
  return response;
});

export const config = {
  // matcher: ['/private/:path*', '/api/:path*'],
  matcher: ['/private/:path*', '/api/:path*', '/:path*'],
};
