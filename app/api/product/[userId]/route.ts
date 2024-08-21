import { getProductsInUserInventories } from "@/server/product";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const products = await getProductsInUserInventories(params.userId);

    return NextResponse.json({ results: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
