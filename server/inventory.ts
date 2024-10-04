import prisma from "@/lib/db";
import {
  CurrentInventoryMembers,
  currentUserInventoriesRolesType,
  UserInventoriesPromise,
} from "@/types/server/inventory";

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
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getUserInventoryIds(userId: string): Promise<string[]> {
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
      orderBy: {
        createdAt: "asc",
      },
    });

    const result = invWithMembers.map((inventory) => ({
      ...inventory,
      memberCount: inventory.users.length,
    }));

    return result;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

// For Table Data Inventory Details
export async function getCurrentInventoryMembers(
  userId: string,
  inventoryId: string,
): Promise<CurrentInventoryMembers[]> {
  try {
    //* Check if the requesting user has access to said inventory
    const userHasAccess = await prisma.inventoryMember.findFirst({
      where: {
        userId: userId,
        inventoryId: inventoryId,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!userHasAccess) {
      throw new Error("User are not part of that inventory");
    }

    const inventoryMembers = await prisma.inventoryMember.findMany({
      where: {
        inventoryId: inventoryId,
      },
      include: {
        user: {
          select: {
            fullname: true,
            email: true,
            image: true,
          },
        },
      },
    });

    const result = inventoryMembers.map((member) => {
      return {
        id: member.id,
        name: member.user.fullname,
        email: member.user.email,
        photo: member.user.image as string,
        role: member.role,
        joined: member.createdAt,
        userId: member.userId,
        inventoryId: member.inventoryId,
        currentUserRole: userHasAccess.role, //* The current user session role on this inventory
        currentUserEmail: userHasAccess.user.email, //* The current user session email on this inventory
      };
    });

    return result;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

// For User Roles List
export async function currentUserInventoriesRoles(
  userId: string,
): Promise<currentUserInventoriesRolesType[]> {
  try {
    const userInventories = await prisma.inventoryMember.findMany({
      where: {
        userId: userId,
      },
      include: {
        inventory: true,
      },
    });

    const results = userInventories.map((user) => {
      return {
        userId: user.userId,
        role: user.role,
        inventoryId: user.inventory.id,
        inventoryName: user.inventory.name,
        inventoryColor: user.inventory.color as string,
      };
    });

    return results;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
