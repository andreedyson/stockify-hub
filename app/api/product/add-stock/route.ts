import prisma from "@/lib/db";
import { addStockSchema } from "@/types/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, productId, stock } = await req.json();

  try {
    const response = addStockSchema.safeParse({ stock });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "You need to be authenticated to add an inventory" },
        { status: 401 },
      );
    }

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: { increment: stock },
      },
    });

    return NextResponse.json(
      { message: "Stock successfully added" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
