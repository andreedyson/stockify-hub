import { HighestSellingProductsType } from "@/types/server/product";
import Image from "next/image";
import HighestSellingList from "./list/HighestSellingList";

type HighestSellingDataType = {
  productsData: HighestSellingProductsType[];
};

function HighestSellingData({ productsData }: HighestSellingDataType) {
  return (
    <article className="h-full w-full">
      <div>
        {productsData.length ? (
          <>
            {productsData.map((product) => (
              <HighestSellingList key={product.id} productData={product} />
            ))}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
            <Image
              src={"/assets/list-empty.svg"}
              width={150}
              height={150}
              alt="Highest Selling Products Empty"
              className="size-[50%] lg:size-[300px]"
              priority
            />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold md:text-base">
                No Highest Selling List Data
              </h4>
              <p className="text-[10px] text-desc md:text-sm">
                Showing 5 products with the highest transaction count.
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default HighestSellingData;
