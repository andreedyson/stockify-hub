export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/inventory",
    "/products",
    "/transactions",
    "/reports",
  ],
};
