import { getTransactionsByTimeSpan } from "@/server/transaction";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("span");
    const userId = url.searchParams.get("userId");

    if (!query || !userId) {
      return NextResponse.json(
        { error: "Parameter is required" },
        { status: 400 },
      );
    }

    const res = await getTransactionsByTimeSpan(userId, query);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
