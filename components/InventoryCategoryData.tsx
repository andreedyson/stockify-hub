import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryCategoryCharts } from "./charts/InventoryCategoryCharts";
import { InventoriesCategoriesChartDataType } from "@/types/server/category";
import Image from "next/image";

type InventoryCategoryDataProps = {
  categoryData: InventoriesCategoriesChartDataType[];
};

function InventoryCategoryData({ categoryData }: InventoryCategoryDataProps) {
  return (
    <div className="flex h-full w-full justify-between">
      <div className="w-full">
        {categoryData.length ? (
          <Tabs defaultValue={categoryData[0].inventoryId} className="w-full">
            <TabsList className="grid h-full w-full grid-cols-2 place-items-center gap-3 md:grid-cols-3 lg:grid-cols-6">
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
                <TabsContent value={data.inventoryId} className="h-full">
                  <InventoryCategoryCharts categoryData={data.chartData} />
                </TabsContent>
              </div>
            ))}
          </Tabs>
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
              <p className="text-[10px] text-desc md:text-sm">
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
