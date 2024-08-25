import { currencyFormatterIDR } from "@/lib/utils";
import { HighestSellingProductsType } from "@/types/server/product";

type HighestSellingListType = {
  productData: HighestSellingProductsType;
};

function HighestSellingList({ productData }: HighestSellingListType) {
  return (
    <article className="h-full w-full">
      <div
        className="py-2 pl-4"
        style={{ borderLeft: `3px solid ${productData.inventoryColor}` }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2 text-xs md:text-sm">
            <p className="line-clamp-1">{productData.name}</p>
            <span className="line-clamp-1 text-desc">
              {productData.transactionCount} Transactions
            </span>
          </div>
          <div className="space-y-2 text-right text-xs md:text-sm">
            <p>{currencyFormatterIDR(productData.price)}</p>
            <span className="text-desc">{productData.stock} Left</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default HighestSellingList;
