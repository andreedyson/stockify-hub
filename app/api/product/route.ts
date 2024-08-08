import prisma from "@/lib/db";
import { productSchema } from "@/types/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, price, stock, image, categoryId, inventoryId } =
    await req.json();

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

    // TODO: Validate categoryId

    const response = productSchema.safeParse({
      name,
      description,
      price,
      stock,
      image,
    });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        image: image,
        categoryId: categoryId,
        inventoryId: inventoryId,
      },
    });

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const {
    productId,
    name,
    description,
    price,
    stock,
    image,
    categoryId,
    inventoryId,
  } = await req.json();

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

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

    // TODO: Validate categoryId

    const response = productSchema.safeParse({
      name,
      description,
      price,
      stock,
      image,
    });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        image: image,
        categoryId: categoryId,
        inventoryId: inventoryId,
      },
    });

    return NextResponse.json(
      { message: "Product edited successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { productId } = await req.json();

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
