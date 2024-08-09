export { default } from "next-auth/middleware";

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
