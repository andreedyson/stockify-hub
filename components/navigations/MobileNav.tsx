"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "../cards/UserAvatar";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import { useSession } from "next-auth/react";

function MobileNav() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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
    <div className="sticky top-0 z-20 md:mt-6">
      <nav className="relative flex w-full items-center justify-between rounded-md border bg-accent p-4 shadow-md shadow-accent/60 dark:shadow-white/5 lg:hidden">
        <div
          onClick={() => setOpenNav((prev) => !prev)}
          className="cursor-pointer"
        >
          {openNav ? <X size={28} /> : <AlignJustify size={28} />}
        </div>
        <div
          className={`absolute top-[70px] flex h-[92vh] w-full flex-col bg-background p-4 shadow-[0px_0px_10px_2px_#00000024] duration-200 dark:bg-background ${openNav ? "left-0" : "-left-[1000px]"}`}
        >
          <div className="flex flex-col gap-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.title}
                href={link.path}
                className={cn(
                  "flex items-center gap-2 rounded-md p-4 text-xs font-semibold",
                  pathname === link.path &&
                    "bg-main-200 font-semibold text-main-800 shadow-[0px_0px_10px_2px_#00000024] transition-all duration-300 ease-in-out dark:bg-main-950 dark:text-main-300",
                )}
                onClick={() => setOpenNav(false)}
              >
                {link.icon} {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Link href={"/dashboard"} className="logo text-lg md:text-xl">
            StockifyHub
          </Link>
        </div>
        <div className="flex items-center">
          {session?.user && (
            <UserAvatar
              data={
                session.user as {
                  name: string;
                  email: string;
                  image: string | null;
                }
              }
            />
          )}
        </div>
      </nav>
    </div>
  );
}

export default MobileNav;
