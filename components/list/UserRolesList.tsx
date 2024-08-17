import { cn } from "@/lib/utils";
import { currentUserInventoriesRolesType } from "@/server/inventory";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type UserRolesListType = {
  data: currentUserInventoriesRolesType;
};

function UserRolesList({ data }: UserRolesListType) {
  return (
    <Link href={`/inventory/${data.inventoryId}`}>
      <article
        style={{ borderLeft: `3px solid ${data.inventoryColor}` }}
        className="bg-card-light rounded-md px-3 py-2"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <h4 className="line-clamp-1 text-sm font-bold md:text-base">
              {data.inventoryName}
            </h4>
            <p
              className={cn(
                "text-xs md:text-sm",
                data.role === "OWNER" && "font-semibold text-yellow-500",
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

export default UserRolesList;
