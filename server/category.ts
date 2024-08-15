import prisma from "@/lib/db";
import { Category } from "@prisma/client";

export type CategoriesByUserType = Omit<Category, "createdAt" | "updatedAt"> & {
  inventoryName: string;
};

export type InventoryCategoriesChartData = {
  Category: string;
  Products: number;
  fill: string;
};

export type InventoriesCategoriesChartDataType = {
  inventoryId: string;
  inventoryName: string;
  totalCategories: number;
  chartData: InventoryCategoriesChartData[];
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
              NOT: {
                role: "USER",
              },
            },
          },
        },
      },
      include: {
        Inventory: true,
      },
    });

    const results = categories.map((cat) => {
      return {
        id: cat.id,
        name: cat.name,
        inventoryId: cat.inventoryId,
        inventoryName: cat.Inventory.name,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getInventoriesCategoriesChartData(
  userId: string,
): Promise<InventoriesCategoriesChartDataType[]> {
  try {
    const userInventories = await prisma.inventoryMember.findMany({
      where: {
        userId: userId,
      },
    });

    const inventoryIds = userInventories.map((member) => member.inventoryId);

    const inventories = await prisma.inventory.findMany({
      where: {
        id: {
          in: inventoryIds,
        },
      },
      include: {
        categories: {
          select: {
            name: true,
            products: true,
          },
        },
      },
    });

    const results = inventories.map((inventory) => {
      const categoryData = inventory.categories.map((category) => {
        return {
          Category: category.name,
          Products: category.products.length,
          fill: `var(--color-${inventory.name.slice(0, 3)})`,
        };
      });

      return {
        inventoryId: inventory.id,
        inventoryName: inventory.name,
        totalCategories: inventory.categories.length,
        chartData: categoryData,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
