import { getInventoryCategories } from "@/server/category";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const categories = await getInventoryCategories(params.id);

    return NextResponse.json({ categories: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
