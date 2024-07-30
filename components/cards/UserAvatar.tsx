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
import Image from "next/image";

type UserAvatarProps = {
  data: {
    name: string;
    email: string;
    image: string | null;
  };
};

function UserAvatar({ data }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full md:size-10"
        >
          <Avatar className="size-8 md:size-10">
            <AvatarImage
              src={data?.image || "assets/profile-not-found.svg"}
              alt={data?.name || "User Avatar"}
            />
            <AvatarFallback className="bg-main-200 dark:bg-main-950">
              <Image
                src={"/assets/profile-not-found.svg"}
                alt="profile_photo"
                width={150}
                height={150}
                priority
                className="size-20 rounded-full object-cover md:size-[150px]"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{data?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.email}
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
