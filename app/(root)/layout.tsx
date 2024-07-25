import type { Metadata } from "next";
import AuthProvider from "@/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/navigations/Sidebar";
import Header from "@/components/navigations/Header";
import MobileNav from "@/components/navigations/MobileNav";

export const metadata: Metadata = {
  title: {
    template: "Stockify - %s",
    default: "Stockify",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-[1920px]">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Sidebar />
            <div className="md:mx-6 lg:ml-[200px] lg:pl-6 xl:ml-[250px]">
              <Header />
              <MobileNav />
              <div className="py-6 max-md:px-4">{children}</div>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
