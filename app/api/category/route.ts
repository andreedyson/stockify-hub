import prisma from "@/lib/db";
import { categorySchema } from "@/types/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, inventoryId } = await req.json();

  try {
    const response = categorySchema.safeParse({ name });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const nameExist = await prisma.category.findFirst({
      where: {
        name: name,
        inventoryId: inventoryId,
      },
    });

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
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
    const response = categorySchema.safeParse({ name });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const nameExist = await prisma.category.findFirst({
      where: {
        name: name,
        inventoryId: inventoryId,
        id: { not: categoryId },
      },
    });

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
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
  const { categoryId, inventoryId } = await req.json();

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category does not exist" },
        { status: 404 },
      );
    }

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory does not exist" },
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
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        { message: "Can't delete category,  it is referenced in other table" },
        { status: 400 },
      );
    }
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
