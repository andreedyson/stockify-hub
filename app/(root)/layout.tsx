import type { Metadata } from "next";
import AuthProvider from "@/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
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
    <html lang="en" className="dark">
      <body>
        <AuthProvider>
          <Sidebar />
          <div className="md:mx-6 lg:ml-[200px] lg:pl-6 xl:ml-[250px]">
            <Header />
            <MobileNav />
            <div className="py-6 max-md:px-4">{children}</div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
