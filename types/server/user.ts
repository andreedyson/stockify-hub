import { User } from "@prisma/client";

export type CurrentUserPromise = Omit<User, "id" | "password">;

type DashboardDataProps = {
  title: string;
  amount: number;
  color: string;
};

export type DashboardStatisticProps = DashboardDataProps[];
