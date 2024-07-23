import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fullname, email, password } = await req.json();

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    if (fullname.trim().length < 4) {
      return NextResponse.json(
        {
          message: "Name should be at least 4 characters",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password should be at least 6 characters",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User Registered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
