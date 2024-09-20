import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoriesCategoriesChartDataType } from "@/types/server/category";
import { Layers3, Package } from "lucide-react";
import Image from "next/image";
import { InventoryCategoryCharts } from "./charts/InventoryCategoryCharts";

type InventoryCategoryDataProps = {
  categoryData: InventoriesCategoriesChartDataType[];
};

function InventoryCategoryData({ categoryData }: InventoryCategoryDataProps) {
  const totalCategories = categoryData.reduce(
    (acc, inventory) => acc + inventory.totalCategories,
    0,
  );

  return (
    <div className="flex h-full w-full justify-between">
      <div className="w-full">
        {categoryData.length ? (
          <div className="grid w-full grid-cols-1 xl:grid-cols-12 xl:divide-x-2">
            <div className="col-span-1 w-full xl:col-span-9 xl:pr-4">
              <Tabs
                defaultValue={categoryData[0].inventoryId}
                className="w-full"
              >
                <TabsList className="grid h-full w-full grid-cols-2 place-items-center gap-3 lg:grid-cols-6">
                  {categoryData.map((tab) => (
                    <TabsTrigger
                      key={tab.inventoryId}
                      value={tab.inventoryId}
                      className="line-clamp-1 w-full md:max-w-[200px]"
                    >
                      {tab.inventoryName}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {categoryData.map((data) => (
                  <div key={data.inventoryId} className="h-full">
                    <TabsContent
                      value={data.inventoryId}
                      className="h-full w-full"
                    >
                      <InventoryCategoryCharts categoryData={data.chartData} />
                    </TabsContent>
                  </div>
                ))}
              </Tabs>
            </div>
            <div className="col-span-1 flex h-full flex-col justify-center divide-y-2 xl:col-span-3 xl:pl-4">
              <div className="items-center gap-3 space-y-2 py-6 max-lg:flex">
                <div className="w-fit rounded-md bg-input p-3 text-main-500">
                  <Package className="size-6" />
                </div>
                <div>
                  <p className="desc-2 text-xs md:text-sm">
                    Inventory Overview
                  </p>
                  <p className="text-sm font-light md:text-base">
                    <span className="text-xl font-bold text-foreground lg:text-2xl">
                      {categoryData.length}
                    </span>{" "}
                    Inventories
                  </p>
                </div>
              </div>
              <div className="items-center gap-3 space-y-2 py-6 max-lg:flex">
                <div className="w-fit rounded-md bg-input p-3 text-main-500">
                  <Layers3 className="size-6" />
                </div>
                <div>
                  <p className="desc-2 text-xs md:text-sm">Category Overview</p>
                  <p className="text-sm font-light md:text-base">
                    <span className="text-xl font-bold text-foreground lg:text-2xl">
                      {totalCategories}
                    </span>{" "}
                    Categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
            <Image
              src={"/assets/category-tabs-empty.svg"}
              width={200}
              height={300}
              alt="Empty Category Tabs"
              className="h-[250px] w-[300px]"
              priority
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold md:text-base">
                You don&apos;t have any inventory categories data yet
              </h4>
              <p className="desc-2 text-[10px] md:text-sm">
                Tabs with charts showing the inventory categories data will
                appear here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InventoryCategoryData;
