"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import Image from "next/image";
import { Button } from "../ui/button";

import { currencyFormatterIDR } from "@/lib/utils";
import { ProductWithCategory } from "@/types/server/product";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AddStocksDialog from "../dialogs/AddStocksDialog";
import DeleteProductDialog from "../dialogs/DeleteProductDialog";

type ProductListProps = {
  products: ProductWithCategory[];
  size?: number;
};

function ProductsList({ products, size }: ProductListProps) {
  const dataPerPage = 5;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(size || dataPerPage);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [action, setAction] = useState<"edit" | "delete" | "add" | "">("");
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [addStockProductId, setAddStockProductId] = useState<string | null>(
    null,
  );

  const handleSubmitSuccess = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {products.length > 0 ? (
        <>
          <div className="flex flex-col gap-3 overflow-x-auto">
            {products.slice(startIndex, endIndex).map((product) => (
              <article
                key={product.id}
                className="bg-card-light flex max-w-full items-center rounded-md p-4"
              >
                {/* Product Image & Name */}
                <div className="flex w-[350px] max-md:gap-6 md:w-[400px]">
                  <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="size-16 rounded-md bg-zinc-200 dark:bg-zinc-500 md:size-20">
                      <Image
                        src={product.image}
                        width={80}
                        height={80}
                        alt="Product Image"
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                    <div className="max-w-80">
                      <h4 className="line-clamp-1 text-base font-bold md:text-lg">
                        {product.name}
                      </h4>
                      <p className="desc-2 line-clamp-1 text-xs md:text-sm">
                        <span>{product.Category?.name}</span>
                        {" | "}
                        <span>{product.stock} Items</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex w-80 flex-col justify-between md:flex-row md:items-center">
                  <div className="w-[150px] space-y-1 border-l-2 border-input py-1.5 pl-3.5 max-md:py-3">
                    <p className="desc-2 text-[10px] font-medium uppercase md:text-xs">
                      Price
                    </p>
                    <p className="line-clamp-1 text-xs font-semibold md:text-sm">
                      {currencyFormatterIDR(product.price)}
                    </p>
                  </div>
                  <div className="w-[150px] space-y-1 border-l-2 border-input py-1.5 pl-3.5 max-md:py-3">
                    <p className="desc-2 text-[10px] font-medium uppercase md:text-xs">
                      Inventory
                    </p>
                    <p className="line-clamp-1 text-xs font-semibold md:text-sm">
                      {product.Inventory?.name}
                    </p>
                  </div>
                </div>

                {/* Product Actions */}
                <div className="ml-auto max-md:pl-3.5">
                  {product.currentUserRole !== "USER" && (
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem>
                              <Link
                                href={`/products/edit-product/${product.id}`}
                                className="flex items-center gap-2"
                              >
                                <Pencil className="h-4 w-4" /> Edit Product
                              </Link>
                            </DropdownMenuItem>
                          </DialogTrigger>
                          {product.currentUserRole === "OWNER" && (
                            <DialogTrigger
                              asChild
                              onClick={() => {
                                setAction("delete");
                                setDeleteProductId(product.id);
                              }}
                            >
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4" color="red" />
                                Delete Product
                              </DropdownMenuItem>
                            </DialogTrigger>
                          )}
                          <DialogTrigger
                            asChild
                            onClick={() => {
                              setAction("add");
                              setAddStockProductId(product.id);
                            }}
                          >
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Plus className="h-4 w-4" color="aqua" />
                              Add Stocks
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {action === "delete" && (
                        <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
                          <DeleteProductDialog
                            productId={deleteProductId || ""}
                            onSubmitSuccess={handleSubmitSuccess}
                          />
                        </DialogContent>
                      )}

                      {action === "add" && (
                        <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
                          <AddStocksDialog
                            productId={addStockProductId || ""}
                            userId={product.currentUserId}
                            onSubmitSuccess={handleSubmitSuccess}
                          />
                        </DialogContent>
                      )}
                    </Dialog>
                  )}
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
                    setStartIndex(startIndex - (size || dataPerPage));
                    setEndIndex(endIndex - (size || dataPerPage));
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
                    setStartIndex(startIndex + (size || dataPerPage));
                    setEndIndex(endIndex + (size || dataPerPage));
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4 text-center">
          <Image
            src={"/assets/product-not-found.svg"}
            width={200}
            height={400}
            alt="Product Not Found"
            className="size-[80%] lg:size-[350px]"
            priority
          />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold md:text-base">
              No products data found
            </h4>
            <p className="desc-2 text-[10px] md:text-sm">
              Your list of products from each inventory will show here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
