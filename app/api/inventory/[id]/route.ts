import { getUserInventories } from "@/server/inventory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const inventories = await getUserInventories(params.id);

    return NextResponse.json({ inventory: inventories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
