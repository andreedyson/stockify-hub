import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { fullname, email, image } = await req.json();

  console.log({ fullname, email, image });

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 },
      );
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        fullname: fullname,
        image: image,
      },
    });

    return NextResponse.json(
      { message: "User successfully Updated" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
