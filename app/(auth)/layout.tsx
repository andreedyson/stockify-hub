import type { Metadata } from "next";
import AuthProvider from "@/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

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
        <body>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
