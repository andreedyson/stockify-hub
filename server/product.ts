import prisma from "@/lib/db";
import {
  HighestSellingProductsType,
  InventoriesProductCountType,
  LowStockProductsType,
  ProductsInUserInventoriesType,
  ProductsValueType,
} from "@/types/server/product";
import { Product } from "@prisma/client";

async function getUserInventoryIds(userId: string): Promise<string[]> {
  // Search inventories the user is a part of
  const userInventories = await prisma.inventoryMember.findMany({
    where: {
      userId: userId,
    },
    select: {
      inventoryId: true,
    },
  });

  // Extract all of the inventory IDs
  const inventoryIds = userInventories.map((member) => member.inventoryId);

  return inventoryIds;
}

export async function getProductById(
  userId: string,
  productId: string,
): Promise<Product> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const userIsPartOfTheInventory = await prisma.inventoryMember.findFirst({
      where: {
        userId: userId,
        inventoryId: product.inventoryId,
      },
    });

    if (!userIsPartOfTheInventory) {
      throw new Error("You are not part of that inventory");
    }

    if (userIsPartOfTheInventory.role === "USER") {
      throw new Error("You are not allowed to edit this product data");
    }

    return product;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getProductsInUserInventories(
  userId: string,
): Promise<ProductsInUserInventoriesType[]> {
  try {
    const inventoryIds = await getUserInventoryIds(userId);

    const products = await prisma.product.findMany({
      where: {
        inventoryId: {
          in: inventoryIds,
        },
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Inventory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const results = await Promise.all(
      products.map(async (product) => {
        const user = await prisma.inventoryMember.findFirst({
          where: {
            userId: userId,
            inventoryId: product.inventoryId,
          },
        });

        return {
          ...product,
          userId: user?.id as string,
          currentUserRole: user?.role ?? "USER",
        };
      }),
    );

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getProductsByInventory(
  userId: string,
  inventoryId: string,
): Promise<ProductsInUserInventoriesType[]> {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    const products = await prisma.product.findMany({
      where: {
        inventoryId: inventoryId, // Get by inventoryId
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
        Inventory: {
          select: {
            name: true,
          },
        },
      },
    });

    const results = await Promise.all(
      products.map(async (product) => {
        const user = await prisma.inventoryMember.findFirst({
          where: {
            userId: userId,
            inventoryId: product.inventoryId,
          },
        });

        return {
          ...product,
          userId: user?.id as string,
          currentUserRole: user?.role ?? "USER",
        };
      }),
    );

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getInventoriesProductCount(
  userId: string,
): Promise<InventoriesProductCountType[]> {
  try {
    const inventoryIds = await getUserInventoryIds(userId);

    const inventoryData = await prisma.inventory.findMany({
      where: {
        id: {
          in: inventoryIds,
        },
      },
      include: {
        products: true,
      },
    });

    const results = inventoryData.map((inventory) => {
      return {
        inventory: inventory.name,
        products: inventory.products.length,
        fill: `var(--color-${inventory.name.slice(0, 3)})`,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getLowStocksProducts(
  userId: string,
): Promise<LowStockProductsType[]> {
  try {
    const inventoryIds = await getUserInventoryIds(userId);

    const products = await prisma.product.findMany({
      where: {
        inventoryId: {
          in: inventoryIds,
        },
        stock: {
          lt: 5,
        },
      },
      include: {
        Category: {
          select: {
            name: true,
          },
        },
      },
      take: 5,
    });

    const result = products.map((product) => {
      return {
        name: product.name,
        stock: product.stock,
      };
    });

    return result;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getHighestSellingProducts(
  userId: string,
): Promise<HighestSellingProductsType[]> {
  try {
    const inventoryIds = await getUserInventoryIds(userId);

    const products = await prisma.product.findMany({
      where: {
        inventoryId: {
          in: inventoryIds,
        },
      },
      include: {
        Inventory: {
          select: {
            name: true,
            color: true,
          },
        },
        _count: {
          select: {
            Transaction: true,
          },
        },
      },
      take: 5,
    });

    // Filter product that has transaction count that's greater or equal to 5
    const filter = products.filter((product) => {
      return product._count.Transaction >= 5;
    });

    const results = filter.map((product) => {
      return {
        id: product.id,
        name: product.name,
        stock: product.stock,
        price: product.price,
        inventoryColor: product.Inventory.color as string,
        transactionCount: product._count.Transaction,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getInventoriesProductsValue(
  userId: string,
): Promise<ProductsValueType[]> {
  try {
    const inventoryIds = await getUserInventoryIds(userId);

    const inventoryData = await prisma.inventory.findMany({
      where: {
        id: {
          in: inventoryIds,
        },
      },
      include: {
        products: {
          select: {
            price: true,
          },
        },
      },
    });

    const results = inventoryData.map((inventory) => {
      const productsPrice = inventory.products.map((product) => product.price);
      const productsValue = productsPrice.reduce((acc, curr) => {
        return acc + curr;
      }, 0);

      return {
        inventory: inventory.name,
        value: productsValue,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
