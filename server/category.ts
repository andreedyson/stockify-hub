import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export async function getInventoryCategories(
  inventoryId: string,
): Promise<Category[]> {
  try {
    const inventoryCategory = await prisma.category.findMany({
      where: {
        inventoryId: inventoryId,
      },
    });

    if (!inventoryCategory) {
      throw new Error("Categories not found");
    }

    return inventoryCategory;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
