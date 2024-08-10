import { create } from "zustand";
import { Category } from "@prisma/client";
import { BASE_URL } from "@/constants";
import { CategoriesByUserType } from "@/server/category";

type InventoryCategoryStore = {
  data: {
    results: CategoriesByUserType[];
  };
  isLoading: boolean;
  error: string | null;
  fetchCategories: (userId: string) => Promise<void>;
};

export const useCategoryStore = create<InventoryCategoryStore>((set) => ({
  data: { results: [] },
  isLoading: false,
  error: null,
  fetchCategories: async (userId) => {
    set({ isLoading: true, error: null });
    const response = await fetch(
      `${BASE_URL}/api/inventory/category/${userId}`,
    );
    const data = await response.json();
    console.log(data);
    set({ data: data, isLoading: false });
    try {
    } catch (error) {
      set({ error: "Failed to fetch inventory categories", isLoading: false });
    }
  },
}));
