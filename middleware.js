import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/signin" || path == "/signup" || path == "/";

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/", "/signin", "/signout", "/profile", "/verifymail"],
};
