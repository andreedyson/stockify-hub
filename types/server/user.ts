import { User } from "@prisma/client";

export type CurrentUserPromise = Omit<User, "id" | "password">;
