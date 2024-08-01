import prisma from "@/lib/db";
import { inventorySchema } from "@/types/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, name, color } = await req.json();

  try {
    const response = inventorySchema.safeParse({ name, color });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "You need to be authenticated to add an inventory" },
        { status: 401 },
      );
    }

    await prisma.inventory.create({
      data: {
        name: name,
        color: color,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Inventory successfully created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
