"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";
import UserAvatar from "../cards/UserAvatar";
import { useSession } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const pageName = pathname.split("/")[1];
  const router = useRouter();

  return (
    <div className="sticky top-6 z-50 hidden w-full items-center justify-between rounded-md border-2 bg-white p-3 shadow-md shadow-accent/60 dark:bg-accent dark:shadow-white/5 lg:flex">
      <div className="flex items-center gap-2">
        {pathname.split("/").length >= 3 && (
          <ArrowLeft
            size={28}
            className="cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <h3 className="text-2xl font-bold capitalize">{pageName}</h3>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {session?.user && <UserAvatar userId={session.user.id} />}
      </div>
    </div>
  );
}

export default Header;
