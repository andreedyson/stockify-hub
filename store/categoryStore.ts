import { BASE_URL } from "@/constants";
import { CategoriesByUserType } from "@/types/server/category";
import { create } from "zustand";

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
    set({ data: data, isLoading: false });
    try {
    } catch (error) {
      set({ error: "Failed to fetch inventory categories", isLoading: false });
    }
  },
}));
