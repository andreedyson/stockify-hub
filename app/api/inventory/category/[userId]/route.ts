import { getcategoriesByUser } from "@/server/category";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const categories = await getcategoriesByUser(params.userId);

    return NextResponse.json({ results: categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
