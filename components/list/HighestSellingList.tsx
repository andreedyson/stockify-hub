import { currencyFormatterIDR } from "@/lib/utils";
import { HighestSellingProductsType } from "@/server/product";
import Image from "next/image";

type HighestSellingListType = {
  productData: HighestSellingProductsType;
};

function HighestSellingList({ productData }: HighestSellingListType) {
  // TODO: Add empty state
  return (
    <article
      className="px-4 py-2"
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
    </article>
  );
}

export default HighestSellingList;
