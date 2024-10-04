import { getUserInventories } from "@/server/inventory";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const inventories = await getUserInventories(params.userId);

    return NextResponse.json({ results: inventories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
