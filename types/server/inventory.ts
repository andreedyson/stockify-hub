import { Member } from "@/components/tables/members/inventory-members-columns";
import { Inventory } from "@prisma/client";

export type UserInventoriesPromise = Inventory & {
  memberCount?: number;
};

export type InventoryCardType = {
  id: string;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
  memberCount?: number;
};

export type UserInventories = {
  results: InventoryCardType[];
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
