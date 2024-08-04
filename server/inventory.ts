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
