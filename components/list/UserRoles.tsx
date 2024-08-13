import { cn } from "@/lib/utils";
import { currentUserInventoriesRolesType } from "@/server/inventory";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type UserRolesListType = {
  data: currentUserInventoriesRolesType;
};

function UserRoles({ data }: UserRolesListType) {
  return (
    <Link href={`/inventory/${data.inventoryId}`}>
      <article
        style={{ borderLeft: `3px solid ${data.inventoryColor}` }}
        className="rounded-md bg-zinc-200 px-3 py-2 dark:bg-zinc-800"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <h4 className="line-clamp-1 text-base font-semibold md:text-lg">
              {data.inventoryName}
            </h4>
            <p
              className={cn(
                "text-xs md:text-sm",
                data.role === "OWNER",
                "font-semibold text-yellow-500",
              )}
            >
              {data.role}
            </p>
          </div>
          <div>
            <SquareArrowOutUpRight size={20} />
          </div>
        </div>
      </article>
    </Link>
  );
}

export default UserRoles;
