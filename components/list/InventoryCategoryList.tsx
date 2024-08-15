import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoriesCategoriesChartDataType } from "@/server/category";
import { InventoryCategoryCharts } from "../charts/InventoryCategoryCharts";

type InventoryCategoryListProps = {
  categoryData: InventoriesCategoriesChartDataType[];
};

function InventoryCategoryList({ categoryData }: InventoryCategoryListProps) {
  return (
    <div className="flex h-full w-full justify-between">
      <div className="w-full">
        {categoryData.length > 0 && (
          <Tabs defaultValue={categoryData[0].inventoryId} className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {categoryData.map((tab) => (
                <TabsTrigger
                  key={tab.inventoryId}
                  value={tab.inventoryId}
                  className="line-clamp-1 max-w-[200px]"
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
        )}
      </div>
    </div>
  );
}

export default InventoryCategoryList;
