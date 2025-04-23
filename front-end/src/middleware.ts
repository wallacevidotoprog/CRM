import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/home", "/client", "/product", "/user", "/sale"];

  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const homeUrl = new URL("/home", req.url);
    return NextResponse.redirect(homeUrl);
  }

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/client/:path*", "/product/:path*", "/user/:path*", "/sale/:path*"],
};
