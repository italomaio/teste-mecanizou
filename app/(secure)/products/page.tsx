"use client";

import React, { useState } from "react";
import { Label, Pagination, Skeleton } from "@/components";
import { cn } from "@/utils/classes";
import { Loader } from "lucide-react";
import { useProducts } from "@/hooks";
import { ProductCard } from "@/components";

const ProductsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { products, loading, total, limit, fetchProducts } = useProducts();

  return (
    <div
      className={cn("w-full h-full flex flex-col flex-1 overflow-hidden", {
        "justify-items-center": loading,
      })}
    >
      <div className="w-full flex flex-row gap-2 p-4 items-center justify-end">
        <div className="flex flex-row gap-2 items-center">
          {loading && !products.length && (
            <>
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-5" />
            </>
          )}

          {!loading && (
            <Pagination
              totalPages={Math.ceil(total / limit)}
              currentPage={page}
              onPageChange={(page) => {
                setPage(page);
                fetchProducts({
                  skip: (page - 1) * limit,
                });
              }}
            />
          )}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col flex-1 w-full items-center justify-center gap-2">
          <Loader className="animate-spin" />
          <Label className="font-semibold">Carregando...</Label>
        </div>
      )}

      {!loading && (
        <div className="w-full container m-auto h-full flex-1 overflow-y-scroll hide-scrollbar">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
