import { Member } from "@/app/members/inventory-members-columns";
import prisma from "@/lib/db";
import { Inventory } from "@prisma/client";

type UserInventoriesPromise = Inventory & {
  memberCount?: number;
};

export type CurrentInventoryMembers = Member & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
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

export async function getCurrentInventoryMember(
  userId: string,
  inventoryId: string,
): Promise<CurrentInventoryMembers[]> {
  try {
    const user = await prisma.inventoryMember.findFirst({
      where: {
        userId: userId,
        inventoryId: inventoryId,
      },
    });

    if (!user) {
      throw new Error("User not found");
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

    // TODO: Add current logged in user role to check
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
        currentUserRole: user.role,
      };
    });

    return result;
  } catch (error) {
    throw new Error("There was a problem getting inventory member data");
  }
}
