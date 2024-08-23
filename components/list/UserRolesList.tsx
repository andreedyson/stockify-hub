import { cn } from "@/lib/utils";
import { currentUserInventoriesRolesType } from "@/types/server/inventory";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

type UserRolesListType = {
  userData: currentUserInventoriesRolesType;
};

function UserRolesList({ userData }: UserRolesListType) {
  return (
    <div>
      <Link href={`/inventory/${userData.inventoryId}`}>
        <article
          style={{ borderLeft: `3px solid ${userData.inventoryColor}` }}
          className="bg-card-light rounded-md px-3 py-2"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <h4 className="line-clamp-1 text-sm font-bold md:text-base">
                {userData.inventoryName}
              </h4>
              <p
                className={cn(
                  "text-xs md:text-sm",
                  userData.role === "OWNER" && "font-semibold text-yellow-500",
                )}
              >
                {userData.role}
              </p>
            </div>
            <div>
              <SquareArrowOutUpRight size={20} />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default UserRolesList;
