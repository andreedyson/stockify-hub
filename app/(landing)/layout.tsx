import LandingPageNavbar from "@/components/navigations/LandingPageNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StockifyHub",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <div>
          <LandingPageNavbar />
        </div>
        <div className="mx-6 md:mx-20 lg:mx-24 xl:mx-36">{children}</div>
      </div>
    </main>
  );
}
