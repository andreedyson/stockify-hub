import { cn, currencyFormatterIDR } from "@/lib/utils";
import { UserProductsTotalAssetsProps } from "@/types/server/user";
import Image from "next/image";

type TotalAssetsListProps = {
  assets: UserProductsTotalAssetsProps;
};

function TotalAssetsList({ assets }: TotalAssetsListProps) {
  return (
    <article className="h-full">
      {assets.distribution.length ? (
        <>
          <div className="space-y-2 pb-5 pt-2">
            <p className="text-[12px] text-desc">
              Total Product Assets From {assets.distribution.length || 0}{" "}
              Inventories
            </p>
            <h2 className="text-2xl font-bold xl:text-3xl">
              {currencyFormatterIDR(assets.totalAssets)}
            </h2>
          </div>

          <div>
            <h5 className="font-semibold">Top Inventories</h5>
            <div className="flex flex-col gap-2">
              {assets.distribution.map((data, i) => (
                <div key={i}>
                  <div
                    className={cn(
                      "flex items-center justify-between py-2.5",
                      i !== assets.distribution.length - 1 && "border-b-2",
                    )}
                  >
                    <div>
                      <p className="line-clamp-1 max-w-[150px] text-sm font-semibold">
                        {data.inventory}
                      </p>
                      <span className="text-sm text-zinc-400">
                        {data.percentage}%
                      </span>
                    </div>
                    <p className="text-sm">
                      {currencyFormatterIDR(data.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-2 py-4 text-center md:gap-4">
          <Image
            src={"/assets/total-asset-empty.svg"}
            width={150}
            height={150}
            alt="Total Assets Empty"
            className="size-[50%] lg:size-[75%]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              No total assets to show
            </h4>
            <p className="desc-2 text-[10px] md:text-sm">
              The inventories that you are a part of doesn&apos;t have any
              products yet.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export default TotalAssetsList;
