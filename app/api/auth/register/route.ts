import prisma from "@/lib/db";
import { registerSchema } from "@/types/validations";
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

    const validate = registerSchema.safeParse({ fullname, email, password });

    if (!validate.success) {
      return NextResponse.json(validate.error.format(), { status: 400 });
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
