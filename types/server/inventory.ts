import { Member } from "@/components/tables/members/inventory-members-columns";
import { Inventory } from "@prisma/client";

export type UserInventoriesPromise = Inventory & {
  memberCount?: number;
};

export type CurrentInventoryMembers = Member & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  currentUserEmail: string;
};

export type currentUserInventoriesRolesType = {
  userId: string;
  role: string;
  inventoryId: string;
  inventoryName: string;
  inventoryColor: string;
};
