import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  let isAuthenticated = request.cookies.getAll();
  if (path === "/" && isAuthenticated.length === 0) {
    let signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/signin", "/signup"],
};
