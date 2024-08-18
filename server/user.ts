import prisma from "@/lib/db";
import { CurrentUserPromise } from "@/types/server/user";

export async function getCurrentUser(
  userId: string,
): Promise<CurrentUserPromise> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        fullname: true,
        image: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("There was a problem getting user data");
  }
}
