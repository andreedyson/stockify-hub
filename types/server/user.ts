import { User } from "@prisma/client";
import { ProductsValueWithPctProps } from "./product";

export type CurrentUserPromise = Omit<User, "id" | "password">;

type DashboardDataProps = {
  title: string;
  amount: number;
  color: string;
};

export type DashboardStatisticProps = DashboardDataProps[];

export type UserProductsTotalAssetsProps = {
  totalAssets: number;
  distribution: ProductsValueWithPctProps[];
};
