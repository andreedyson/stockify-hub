import { Category } from "@prisma/client";

export type CategoriesByUserType = Omit<Category, "createdAt" | "updatedAt"> & {
  inventoryName: string;
};

export type InventoryCategoriesChartData = {
  Category: string;
  Products: number;
  fill: string;
};

export type InventoriesCategoriesChartDataType = {
  inventoryId: string;
  inventoryName: string;
  totalCategories: number;
  chartData: InventoryCategoriesChartData[];
};
