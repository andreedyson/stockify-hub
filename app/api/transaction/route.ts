import prisma from "@/lib/db";
import { transactionSchema } from "@/types/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, quantity, status, date } = await req.json();

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

    const response = transactionSchema.safeParse({
      productId,
      quantity,
      date,
      status,
    });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    if (product.stock === 0) {
      return NextResponse.json(
        {
          message: "Item is out of stock",
        },
        { status: 422 },
      );
    }

    if (quantity > product.stock) {
      return NextResponse.json(
        {
          message: `Quantity should be less than or equal to ${product.stock} item`,
        },
        { status: 422 },
      );
    }

    const totalPrice = quantity * product.price;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice,
        status: status,
        date: new Date(date),
      },
    });

    return NextResponse.json(
      { message: "Transaction added successfully", data: transaction },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { transactionId, productId, quantity, status, date } = await req.json();

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        product: {
          include: {
            Inventory: true,
          },
        },
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const response = transactionSchema.safeParse({
      productId,
      quantity,
      date,
      status,
    });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    if (product.inventoryId !== transaction.product.Inventory.id) {
      return NextResponse.json(
        {
          message: "You can't change the product from another inventory.",
        },
        { status: 400 },
      );
    }

    // Check if the quantity is bigger than the current product stock added by the current transaction quantity
    if (quantity > product.stock + transaction.quantity) {
      return NextResponse.json(
        {
          message: `Can't set quantity to ${quantity}. Available stock is ${product.stock + transaction.quantity}.`,
        },
        { status: 422 },
      );
    }

    if (
      status === "CANCELLED" &&
      (quantity > transaction.quantity || quantity < transaction.quantity)
    ) {
      return NextResponse.json(
        {
          message:
            "Can't increase or decrease quantity when cancelling the transaction",
        },
        { status: 400 },
      );
    }

    // Current edited status is not Cancelled and changed to Cancelled,
    // or the product changes, increase back the transaction product stock
    if (
      (transaction.status !== "CANCELLED" && status === "CANCELLED") ||
      transaction.productId !== productId
    ) {
      await prisma.product.update({
        where: {
          id: transaction.productId,
        },
        data: {
          stock: { increment: transaction.quantity },
        },
      });
    }

    // Current edited status is Cancelled and changed to other,
    // or the product changes, decrease the new product stock
    if (
      (transaction.status === "CANCELLED" && status !== "CANCELLED") ||
      transaction.productId !== productId
    ) {
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: { decrement: transaction.quantity },
        },
      });
    }

    const totalPrice = quantity * product.price;
    const qtyDiff = quantity - transaction.quantity;

    if (qtyDiff !== 0 && status !== "CANCELLED") {
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: qtyDiff > 0 ? { decrement: qtyDiff } : { increment: -qtyDiff },
        },
      });
    }

    // Update the transaction regardless of whether the quantity changed
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice,
        status: status,
        date: new Date(date),
      },
    });

    return NextResponse.json(
      { message: "Transaction edited successfully", data: updatedTransaction },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { transactionId, productId } = await req.json();
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    if (transaction.status !== "CANCELLED") {
      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          stock: {
            increment: transaction.quantity,
          },
        },
      });
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
