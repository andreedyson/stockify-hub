import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Special case for UploadThing endpoint
  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token found, user is unauthorized
    if (!token) {
      // For API routes, return JSON response
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 401 },
        );
      }

      // For page routes, redirect to login form
      const url = new URL("/signin", req.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 403 },
      );
    }

    // Redirect to error page for non-API routes
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    // Protected pages
    "/dashboard",
    "/inventory/:path*",
    "/products",
    "/transactions",

    // Protected API routes
    "/api/user/:path*",
    "/api/category/:path*",
    "/api/member/:path*",
    "/api/inventory/:path*",
    "/api/transaction/:path*",
    "/api/product/:path*",
  ],
};
