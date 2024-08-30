import { getProductsByInventory } from "@/server/product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const inventoryId = url.searchParams.get("inventoryId");

    if (!inventoryId || !userId) {
      return NextResponse.json(
        { error: "Parameter is required" },
        { status: 400 },
      );
    }

    const products = await getProductsByInventory(userId, inventoryId);

    return NextResponse.json({ results: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
