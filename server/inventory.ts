import prisma from "@/lib/db";
import { Inventory } from "@prisma/client";

type UserInventoriesPromise = Inventory & {
  memberCount?: number;
};

export async function getUserInventories(
  userId: string,
): Promise<UserInventoriesPromise[]> {
  try {
    const invWithMembers = await prisma.inventory.findMany({
      where: {
        users: { some: { userId } },
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });

    const result = invWithMembers.map((inventory) => ({
      ...inventory,
      memberCount: inventory.users.length,
    }));

    return result;
  } catch (error) {
    throw new Error("There was a problem getting user inventory data");
  }
}

export async function getInventoryById(
  userId: string,
  inventoryId: string,
): Promise<UserInventoriesPromise> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!inventory) {
      throw new Error("Inventory not found");
    }

    return {
      ...inventory,
      memberCount: inventory.users.length,
    };
  } catch (error) {
    throw new Error("There was a problem getting user inventory data");
  }
}
