import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, inventoryId } = await req.json();

  try {
    const nameExist = await prisma.category.findFirst({
      where: {
        name: name,
        inventoryId: inventoryId,
      },
    });

    if (nameExist) {
      return NextResponse.json(
        {
          message: `Category with the name of ${name} already exist in that inventory`,
        },
        { status: 409 },
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

    await prisma.category.create({
      data: {
        name: name,
        inventoryId: inventoryId,
      },
    });

    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { categoryId, name, inventoryId } = await req.json();

  try {
    const nameExist = await prisma.category.findFirst({
      where: {
        name: name,
        inventoryId: inventoryId,
      },
    });

    if (nameExist) {
      return NextResponse.json(
        {
          message: `Category with the name of ${name} already exist in that inventory`,
        },
        { status: 409 },
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

    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(
      { message: "Category edited successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { categoryId } = await req.json();

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category does not exist" },
        { status: 404 },
      );
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
