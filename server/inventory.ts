import { Member } from "@/components/tables/members/inventory-members-columns";
import prisma from "@/lib/db";
import { Inventory } from "@prisma/client";

type UserInventoriesPromise = Inventory & {
  memberCount?: number;
};

export type CurrentInventoryMembers = Member & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  currentUserEmail: string;
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
  } catch (error: any) {
    throw new Error(`${error.message}`);
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
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}

export async function getCurrentInventoryMember(
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
      throw new Error("User not found in that inventory");
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
