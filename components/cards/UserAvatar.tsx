import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import Link from "next/link";

function UserAvatar() {
  const { data: session } = useSession();

  let nameInitial = "";

  if (session?.user?.name) {
    nameInitial = session.user.name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full md:size-10"
        >
          <Avatar className="size-8 md:size-10">
            <AvatarImage
              src={session?.user.image || "assets/not-found.png"}
              alt={session?.user.name || "User Avatar"}
            />
            <AvatarFallback className="bg-main-200 dark:bg-main-950">
              {nameInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/profile"} className="w-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer font-semibold text-red-500"
          >
            Log out
            <DropdownMenuShortcut>
              <LogOutIcon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="lg:hidden">
            Toggle Theme
            <DropdownMenuShortcut>
              <ThemeToggle />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
