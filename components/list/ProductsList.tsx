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
import { Category, Inventory, Product } from "@prisma/client";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import DeleteProductDialog from "../forms/DeleteProductDialog";

export type ProductWithCategory = Product & {
  Category?: Category;
  Inventory?: Inventory;
  userId: string;
  currentUserRole: "USER" | "ADMIN" | "OWNER";
};

type ProductListProps = {
  products: ProductWithCategory[];
};

function ProductsList({ products }: ProductListProps) {
  const dataPerPage = 5;
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(dataPerPage);

  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState("");

  const handleSubmitSuccess = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {products.length > 0 ? (
        <>
          <div className="flex w-full flex-col gap-3 max-md:overflow-x-scroll">
            {products.slice(startIndex, endIndex).map((product) => (
              <article
                key={product.id}
                className="rounded-md bg-muted p-4 max-sm:w-max"
              >
                <div className="flex w-full items-center justify-between max-md:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="size-16 rounded-md bg-zinc-200 dark:bg-zinc-500 md:size-20">
                      <Image
                        src={product.image}
                        width={80}
                        height={80}
                        alt="Product Image"
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                    <div className="max-w-96">
                      <h4 className="line-clamp-1 text-base font-bold md:text-lg">
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
                          {product.currentUserRole === "OWNER" && (
                            <DialogTrigger
                              asChild
                              onClick={() => setAction("edit")}
                            >
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" />{" "}
                                <Link
                                  href={`/products/edit-product/${product.id}`}
                                >
                                  Edit Product
                                </Link>
                              </DropdownMenuItem>
                            </DialogTrigger>
                          )}
                          {product.currentUserRole === "ADMIN" ||
                            (product.currentUserRole === "OWNER" && (
                              <DialogTrigger
                                asChild
                                onClick={() => setAction("delete")}
                              >
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Trash2 className="h-4 w-4" color="red" />
                                  Delete Product
                                </DropdownMenuItem>
                              </DialogTrigger>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="max-w-[350px] rounded-md sm:max-w-[425px]">
                        {action === "delete" ? (
                          <>
                            <DeleteProductDialog productId={product.id} />
                          </>
                        ) : (
                          <></>
                        )}
                      </DialogContent>
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
        </>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
}

export default ProductsList;
