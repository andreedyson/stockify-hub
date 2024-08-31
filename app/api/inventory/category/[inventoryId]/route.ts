import { getInventoryCategories } from "@/server/category";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { inventoryId: string } },
) {
  try {
    const categories = await getInventoryCategories(params.inventoryId);

    return NextResponse.json({ results: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
