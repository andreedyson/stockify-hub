import { Category } from "@prisma/client";

export type CategoriesByUserType = Omit<Category, "createdAt" | "updatedAt"> & {
  inventoryName: string;
};

export type CategoriesByInventoryType = {
  id: string;
  name: string;
  inventoryId: string;
  inventoryName: string;
};

export type InventoryCategoriesChartData = {
  category: string;
  products: number;
  fill: string;
};

export type InventoriesCategoriesChartDataType = {
  inventoryId: string;
  inventoryName: string;
  totalCategories: number;
  chartData: InventoryCategoriesChartData[];
};

export type UserCategories = {
  results: CategoriesByUserType[];
};

export type InventoryCategories = {
  results: CategoriesByInventoryType[];
};
