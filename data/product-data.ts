import { BASE_URL } from "@/constants";
import { UserProducts } from "@/types/server/product";

export async function getProducts(userId: string): Promise<UserProducts> {
  const response = await fetch(`${BASE_URL}/api/product/${userId}`);
  const data = await response.json();

  return data;
}
