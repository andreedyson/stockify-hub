import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function PUT(req: Request) {
  const { fullname, email, image } = await req.json();

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

    const newImgkey = image.split("https://utfs.io/f/")[1];
    const userImgKey = userExists.image?.split(
      "https://utfs.io/f/",
    )[1] as string;

    if (newImgkey !== userImgKey) {
      const utapi = new UTApi();

      await utapi.deleteFiles(userImgKey);
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
