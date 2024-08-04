import { Image } from "next/image";
import type { userRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;

    image: string | null;
    createdAt: string | Date;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: User & {
      id: string;
      image: string | null;
      createdAt: string | Date;
    };
  }
}
