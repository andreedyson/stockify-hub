import prisma from "@/lib/db";
import { Product } from "@prisma/client";

type ProductsForUserType = Product & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  userId: string;
};

export async function getProductsForUser(
  userId: string,
): Promise<ProductsForUserType[]> {
  try {
    // Search inventories the user is a part of
    const inventoryMembers = await prisma.inventoryMember.findMany({
      where: {
        userId: userId,
      },
      select: {
        inventoryId: true,
      },
    });

    // Extract all of the inventory IDs
    const inventoryIds = inventoryMembers.map((member) => member.inventoryId);

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

export async function getProductsByInventory(
  userId: string,
  inventoryId: string,
): Promise<ProductsForUserType[]> {
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
