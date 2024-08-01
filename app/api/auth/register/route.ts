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
        { message: "User with that email already exists" },
        { status: 409 },
      );
    }

    const response = registerSchema.safeParse({ fullname, email, password });

    if (!response.success) {
      const { errors } = response.error;

      return NextResponse.json({ message: errors[0].message }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User successfully Registered" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
