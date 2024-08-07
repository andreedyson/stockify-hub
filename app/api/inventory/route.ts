import prisma from "@/lib/db";
import { inventorySchema } from "@/types/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, name, color } = await req.json();

  try {
    const response = inventorySchema.safeParse({ name, color });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
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
          create: {
            userId,
            role: "OWNER",
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

export async function PUT(req: NextRequest) {
  try {
    const { userId, inventoryId, name, color } = await req.json();

    const response = inventorySchema.safeParse({ name, color });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "You need to be authenticated to edit this inventory" },
        { status: 401 },
      );
    }

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory does not exist" },
        { status: 404 },
      );
    }

    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        name: name,
        color: color,
      },
    });

    return NextResponse.json(
      { message: "Inventory successfully updated" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: NextResponse) {
  try {
    const { userId, inventoryId } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "You need to be authenticated to delete this inventory" },
        { status: 401 },
      );
    }

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory does not exist" },
        { status: 404 },
      );
    }

    await prisma.inventoryMember.deleteMany({
      where: {
        inventoryId: inventoryId,
        userId: userId,
      },
    });

    await prisma.inventory.delete({
      where: {
        id: inventoryId,
      },
    });

    return NextResponse.json(
      { message: "Inventory successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
