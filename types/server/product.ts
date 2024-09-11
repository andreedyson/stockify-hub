import { Inventory, Product } from "@prisma/client";
import { number } from "zod";

export type ProductsInUserInventoriesType = Product & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  Inventory?: Pick<Inventory, "name">;
  currentUserId: string;
};

export type InventoriesProductCountType = {
  inventory: string;
  products: number;
};

export type LowStockProductsType = {
  product: string;
  stock: number;
};

export type HighestSellingProductsType = {
  id: string;
  name: string;
  stock: number;
  price: number;
  inventoryColor: string;
  transactionCount: number;
};

export type ProductsValueType = {
  inventory: string;
  value: number;
};

export type ProductsValueWithPctProps = ProductsValueType & {
  percentage: string;
};

export type UserProducts = {
  results: ProductsInUserInventoriesType[];
};

export type ProductWithCategory = Product & {
  Category?: { name: string };
  Inventory?: { name: string };
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  currentUserId: string;
};
