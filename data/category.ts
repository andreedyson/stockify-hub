import { BASE_URL } from "@/constants";
import { UserCategories } from "@/types/server/category";

export async function getCategories(userId: string): Promise<UserCategories> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/inventory/category/${userId}`,
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
}
