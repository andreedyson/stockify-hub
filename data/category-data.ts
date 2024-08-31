import { BASE_URL } from "@/constants";
import { InventoryCategories, UserCategories } from "@/types/server/category";
import { Category } from "@prisma/client";

export async function getCategories(userId: string): Promise<UserCategories> {
  const response = await fetch(
    `${BASE_URL}/api/inventory/category/user/${userId}`,
  );
  const data = await response.json();

  return data;
}

export async function getCategoriesByInventoryId(
  inventoryId: string,
): Promise<InventoryCategories> {
  const response = await fetch(
    `${BASE_URL}/api/inventory/category/${inventoryId}`,
  );
  const data = await response.json();

  return data;
}
