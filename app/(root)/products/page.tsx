import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
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

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-12 lg:grid-rows-6">
        <div className="bg-main-card rounded-md p-6 md:col-span-4 lg:col-span-9 lg:row-span-full">
          <div className="section-header flex items-center justify-between">
            <h4>Products List</h4>
            <Button variant={"link"} asChild>
              <Link href={"/products/add-product"}>Add Product</Link>
            </Button>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-4 lg:col-span-3 lg:row-span-3">
          <div>
            <h4 className="section-header">Low on Stocks</h4>
          </div>
        </div>
        <div className="bg-main-card rounded-md p-6 md:col-span-4 lg:col-span-3 lg:row-span-3">
          <div>
            <h4 className="section-header">Highest Selling</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="bg-main-card rounded-md p-6">
          <div>
            {/* Charts */}
            <h4 className="section-header">Total Products</h4>
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
