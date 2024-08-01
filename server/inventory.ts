import prisma from "@/lib/db";
import { Inventory } from "@prisma/client";

export async function getUserInventories(userId: string): Promise<Inventory[]> {
  // TODO: Add Member count for each Inventories
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        inventories: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.inventories;
  } catch (error) {
    throw new Error("There was a problem getting user inventory data");
  }
}
