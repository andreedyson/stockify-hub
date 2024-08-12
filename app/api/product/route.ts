import prisma from "@/lib/db";
import { productSchema } from "@/types/validations";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

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

    const response = productSchema.safeParse({
      name,
      description,
      price,
      stock,
      image,
      categoryId,
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

    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    if (!inventory) {
      return NextResponse.json(
        { message: "Inventory not found" },
        { status: 404 },
      );
    }

    const response = productSchema.safeParse({
      name,
      description,
      price,
      stock,
      image,
      categoryId,
    });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const newImgKey = image.split("https://utfs.io/f/")[1];
    const productImgKey = product.image.split("https://utfs.io/f/")[1];

    // If the user image is null, add the image url to the user
    if (!productImgKey) {
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
        { message: "Product successfully updated" },
        { status: 200 },
      );
    }

    // If the image changed, delete previous image from UploadThing
    if (newImgKey !== productImgKey) {
      const utapi = new UTApi();
      await utapi.deleteFiles(productImgKey);
    }

    // Update the product if the image changed
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
      { message: "Product successfully updated" },
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

    const productImgKey = product.image.split("https://utfs.io/f/")[1];

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    const utapi = new UTApi();
    await utapi.deleteFiles(productImgKey);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
