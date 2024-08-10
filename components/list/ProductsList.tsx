"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Category, Inventory, Product } from "@prisma/client";
import { useState } from "react";
import { currencyFormatterIDR } from "@/lib/utils";

type ProductWithCategory = Product & {
  Category?: Category;
  Inventory?: Inventory;
};

type ProductListProps = {
  products: ProductWithCategory[];
};

function ProductsList({ products }: ProductListProps) {
  const dataPerPage = 5;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(dataPerPage);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-3 max-md:overflow-x-scroll">
        {products.slice(startIndex, endIndex).map((product) => (
          <article
            key={product.id}
            className="rounded-md bg-muted p-3 max-sm:w-max"
          >
            <div className="flex w-full items-center justify-between max-md:gap-6">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-md bg-zinc-200 dark:bg-zinc-500 md:size-20">
                  <Image
                    src={product.image}
                    width={80}
                    height={80}
                    alt="Product Image"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold md:text-lg">
                    {product.name}
                  </h4>
                  <p className="text-xs md:text-sm">
                    <span>{product.Category?.name}</span> {" • "}{" "}
                    <span>{product.stock} Item</span>
                  </p>
                </div>
              </div>
              <div className="space-y-1 border-l-2 border-input py-1.5 pl-3.5">
                <p className="text-[10px] font-medium uppercase text-desc md:text-xs">
                  Price
                </p>
                <p className="text-xs font-semibold md:text-sm">
                  {currencyFormatterIDR(product.price)}
                </p>
              </div>
              <div className="space-y-1 border-l-2 border-input py-1.5 pl-3.5">
                <p className="text-[10px] font-medium uppercase text-desc md:text-xs">
                  Inventory
                </p>
                <p className="text-xs font-semibold md:text-sm">
                  {product.Inventory?.name}
                </p>
              </div>
              <div>
                <Button variant={"outline"} size={"icon"}>
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination className="justify-end gap-2">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              size={"sm"}
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : ""
              }
              onClick={() => {
                setStartIndex(startIndex - dataPerPage);
                setEndIndex(endIndex - dataPerPage);
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              variant={"outline"}
              size={"sm"}
              className={
                products.length < endIndex
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              onClick={() => {
                setStartIndex(startIndex + dataPerPage);
                setEndIndex(endIndex + dataPerPage);
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ProductsList;
