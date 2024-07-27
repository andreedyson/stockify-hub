import prisma from "../db";

export async function getCurrentUser(email: string) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return data;
  } catch (error) {
    throw new Error("User not found");
  }
}
