import { BASE_URL } from "@/constants";
import { UserCategories } from "@/types/server/category";

export async function getCategories(userId: string): Promise<UserCategories> {
  const response = await fetch(`${BASE_URL}/api/inventory/category/${userId}`);
  const data = await response.json();

  return data;
}
