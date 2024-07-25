"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

function Header() {
  const pathname = usePathname();
  const pageName = pathname.split("/").join(" ");

  return (
    <div className="sticky top-6 z-50 hidden w-full items-center justify-between rounded-md border-2 bg-background p-3 shadow-md shadow-accent/60 dark:bg-accent dark:shadow-white/5 lg:flex">
      <h3 className="text-2xl font-bold capitalize">{pageName}</h3>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div>{/* <UserAvatar data={data} /> */}</div>
      </div>
    </div>
  );
}

export default Header;
