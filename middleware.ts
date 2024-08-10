import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(req: NextRequest, res: NextResponse) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/inventory",
    "/inventory/:path*",
    "/products",
    "/transactions",
    "/reports",
    "/api/:path*",
  ],
};
