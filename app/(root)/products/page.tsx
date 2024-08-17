import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LowStocksProductsCharts } from "@/components/charts/LowStockProductsCharts";
import { TotalProductsCharts } from "@/components/charts/TotalProductsCharts";
import HighestSellingList from "@/components/list/HighestSellingList";
import ProductsList from "@/components/list/ProductsList";
import { getUserInventories } from "@/server/inventory";
import {
  getHighestSellingProducts,
  getInventoriesProductCount,
  getLowStocksProducts,
  getProductsForUser,
} from "@/server/product";
import { ChartColumnDecreasing, ChevronRight, TrendingUp } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

async function ProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const userId = session.user.id;

  const products = await getProductsForUser(userId);
  const userInventories = await getUserInventories(userId);
  const totalProductsChartData = await getInventoriesProductCount(userId);
  const lowStocksProducts = await getLowStocksProducts(userId);
  const highestSellingProducts = await getHighestSellingProducts(userId);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12 lg:grid-rows-6">
        {/* Products List */}
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-4 lg:col-span-8 lg:row-span-full">
          <div className="section-header flex items-center justify-between">
            <h4>Products List</h4>
            <Link
              href={"/products/add-product"}
              className="flex items-center text-sm text-main-500 duration-200 hover:text-main-300 hover:underline"
            >
              Add Product
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="w-full overflow-hidden">
            <ProductsList products={products} size={8} />
          </div>
        </div>

        {/* Low on Stocks */}
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-2 lg:col-span-4 lg:row-span-3">
          <div>
            <h4 className="section-header">Low on Stocks</h4>
          </div>
          <div className="flex w-full flex-col items-center space-y-2 text-center text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              <ChartColumnDecreasing color="red" className="size-4" />
              {lowStocksProducts.length}{" "}
              {lowStocksProducts.length > 1 ? "products" : "product"} are low on
              stocks
            </div>
            <div className="leading-none text-muted-foreground">
              Showing the products that have less than 5 stocks
            </div>
          </div>
          <LowStocksProductsCharts productsData={lowStocksProducts} />
        </div>

        {/* Highest Selling */}
        <div className="bg-main-card space-y-4 rounded-md p-6 md:col-span-2 lg:col-span-4 lg:row-span-3">
          <div>
            <h4 className="section-header">Highest Selling</h4>
          </div>
          <div className="space-y-4">
            {highestSellingProducts.map((product) => (
              <HighestSellingList key={product.id} productData={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Total Products Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-main-card rounded-md p-6">
          <div>
            <h4 className="section-header">Total Products</h4>
          </div>
          <div className="mt-4">
            <TotalProductsCharts
              productsData={totalProductsChartData}
              inventoriesData={userInventories}
            />
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6">
          <div>
            <h4 className="section-header">Product by Category</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
