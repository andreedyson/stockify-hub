import type { Metadata } from "next";
import AuthProvider from "@/AuthProvider";

export const metadata: Metadata = {
  title: {
    template: "StockifyHub | %s",
    default: "StockifyHub",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
