import prisma from "@/lib/db";
import { Category, Product } from "@prisma/client";

type ProductWithCategory = Product & {
  Category: Category;
};

export async function getProductsForUser(userId: string): Promise<Product[]> {
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

  return products;
}
