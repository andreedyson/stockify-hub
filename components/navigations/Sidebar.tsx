"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed hidden h-full min-h-screen w-[200px] border bg-background shadow-md shadow-accent dark:bg-accent/60 dark:shadow-white/10 lg:block xl:w-[250px]">
      <div className="mx-2 flex h-full flex-col gap-6 xl:mx-4">
        {/* Sidebar Header */}
        <div className="mt-10 px-4">
          <Link href={"/dashboard"} className="logo text-lg md:text-xl">
            StockifyHub
          </Link>
        </div>
        {/* Sidebar Navigations */}
        <div className="flex flex-col">
          {sidebarLinks.map((link) => (
            <Link
              key={link.title}
              href={link.path}
              className={cn(
                "flex items-center gap-4 rounded-md p-4 text-sm",
                pathname === link.path &&
                  "bg-main-200 font-semibold text-main-800 dark:bg-main-950 dark:text-main-300",
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto px-6 py-4">
          <div
            onClick={() => signOut({ redirect: true })}
            className="flex cursor-pointer items-center gap-2 font-semibold text-red-500"
          >
            <LogOut />
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
