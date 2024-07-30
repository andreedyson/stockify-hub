import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, name } = await req.json();

  try {
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
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Inventory successfully Created" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}