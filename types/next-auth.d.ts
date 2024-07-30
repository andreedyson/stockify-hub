import { Image } from "next/image";
import type { userRole } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: userRole | null;
    image: string | null;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    role: userRole | null;
  }

  interface Session {
    user: User & {
      id: string;
      image: string | null;
    };
  }
}
