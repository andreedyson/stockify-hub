import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export type CategoriesByUserType = Omit<Category, "createdAt" | "updatedAt"> & {
  inventoryName: string;
};

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

export async function getcategoriesByUser(
  userId: string,
): Promise<CategoriesByUserType[]> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        // Check the Inventory the current user is part of
        Inventory: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      },
      include: {
        Inventory: true,
      },
    });

    const result = categories.map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        inventoryId: cat.inventoryId,
        inventoryName: cat.Inventory.name,
      };
    });

    return result;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
