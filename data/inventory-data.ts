import { BASE_URL } from "@/constants";
import { UserInventories } from "@/types/server/inventory";

export async function getUserInventoriesData(
  userId: string,
): Promise<UserInventories> {
  const response = await fetch(`${BASE_URL}/api/inventory/details/${userId}`);
  const data = await response.json();

  return data;
}
