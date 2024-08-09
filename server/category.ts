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

export async function getTotalCategoryProducts(categoryId: string) {
  try {
    const product = await prisma.product.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        Category: true,
      },
    });

    return product.length;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
