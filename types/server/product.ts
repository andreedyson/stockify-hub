import { Inventory, Product } from "@prisma/client";

export type ProductsInUserInventoriesType = Product & {
  currentUserRole: "USER" | "ADMIN" | "OWNER";
  Inventory?: Pick<Inventory, "name">;
};

export type InventoriesProductCountType = {
  inventory: string;
  products: number;
};

export type LowStockProductsType = Pick<Product, "name" | "stock">;

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

export type UserProducts = {
  results: ProductsInUserInventoriesType[];
};
