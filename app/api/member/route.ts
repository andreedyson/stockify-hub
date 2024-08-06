import prisma from "@/lib/db";
import { addMemberSchema } from "@/types/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { inventoryId, email, role } = await req.json();

  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory not found" },
        { status: 404 },
      );
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!userExist) {
      return NextResponse.json(
        { message: `User with the email ${email} does not exist` },
        { status: 404 },
      );
    }

    const member = await prisma.inventoryMember.findFirst({
      where: {
        userId: userExist.id,
        inventoryId: inventoryId,
      },
    });

    if (member) {
      return NextResponse.json(
        { message: `That user is already part of this inventory` },
        { status: 409 },
      );
    }

    const response = addMemberSchema.safeParse({ email, role });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    await prisma.inventoryMember.create({
      data: {
        userId: userExist.id,
        inventoryId: inventoryId,
      },
    });

    return NextResponse.json(
      { message: "Member added to the inventory successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { userId, inventoryId, role } = await req.json();

  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory)
      return NextResponse.json(
        { message: "Inventory not found" },
        { status: 404 },
      );

    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!userExist)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    await prisma.inventoryMember.updateMany({
      where: {
        userId: userId,
        inventoryId: inventoryId,
      },
      data: { role: role },
    });

    return NextResponse.json(
      { message: "Member role edited successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { userId, inventoryId } = await req.json();

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!userExist)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory not found" },
        { status: 404 },
      );
    }

    await prisma.inventoryMember.deleteMany({
      where: {
        inventoryId: inventoryId,
        userId: userId,
      },
    });

    return NextResponse.json(
      { message: "User removed from inventory successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
