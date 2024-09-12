"use client";

import { landingPageNavbarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { AlignJustify, SquareArrowOutUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

function LandingPageNavbar() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpenNav(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 md:mx-20 md:mt-16 lg:mx-24 lg:mt-20 xl:mx-36">
      <nav className="relative flex items-center justify-between max-md:bg-[#2f2f2f] max-md:px-6 max-md:py-3">
        {/* Stockify Logo */}
        <div>
          <Link href={"#"}>
            <Image
              src={"/assets/stockify-logo.svg"}
              width={200}
              height={80}
              alt="Stockify Logo"
              className="h-full w-full"
            />
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden gap-12 rounded-full bg-[#2F2F2F] px-6 py-3 md:flex xl:-ml-8">
          {landingPageNavbarLinks.map((link) => (
            <Link href={link.path} key={link.path} className="text-sm">
              {link.title}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <div>
          <Link href={"/signin"}>
            <Button className="hidden bg-main-500 px-6 py-2 text-white hover:bg-main-300 md:block">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div
          onClick={() => setOpenNav((prev) => !prev)}
          className="cursor-pointer md:hidden"
        >
          {openNav ? <X size={24} /> : <AlignJustify size={24} />}
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "absolute top-[48px] h-screen w-[80%] bg-muted p-4 duration-200",
            openNav ? "left-0" : "-left-[2000px]",
          )}
        >
          <div className="flex flex-col justify-between">
            {landingPageNavbarLinks.map((link) => (
              <Link
                href={link.path}
                key={link.path}
                className="py-3 text-sm"
                onClick={() => setOpenNav(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={"/signin"}
              className="mt-2 flex items-center gap-2 font-medium text-main-500 hover:text-main-300"
            >
              Login
              <SquareArrowOutUpRight size={16} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default LandingPageNavbar;
