// // import { NextRequest, NextResponse } from "next/server";
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === '/login' || path === '/signup';
//   const token = request.cookies.get('token')?.value || '';
//   console.log(token);
//   console.table(request.cookies.getAll());
//   if(isPublicPath && token){
//     return NextResponse.redirect(new URL('/', request.url));
//     // return NextResponse.rewrite(new URL('/', request.url));
//   }
//   if(!isPublicPath && !token){
//     return NextResponse.rewrite(new URL('/login', request.url));
//   }

// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/profile", "/login", "signup"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect('/');
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
