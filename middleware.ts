import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("next-auth.session-token");

  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/inventory",
    "/inventory/:path*",
    "/products",
    "/transactions",
    "/api/category",
    "/api/member",
    "/api/inventory",
    "/api/transaction",
    "/api/product",
    "/api/inventory/:path*",
    "/api/product/:path*",
    "/api/transaction/:path*",
  ],
};
