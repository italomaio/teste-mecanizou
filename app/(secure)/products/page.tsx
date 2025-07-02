"use client";

import React, { useState } from "react";
import { Card, Pagination, Skeleton } from "@/components";
import { cn } from "@/utils/classes";
import { useProducts } from "@/hooks";
import { ProductCard } from "@/components";

const ProductsLoadingState: React.FC = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Card key={index} className="flex flex-col gap-2">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-15 w-full mt-2" />
    </Card>
  ));
};

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
          {loading &&
            !products.length &&
            Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-8" />
            ))}

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

      <div className="w-full container m-auto h-full flex-1 overflow-y-scroll hide-scrollbar">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 gap-4">
          {loading && <ProductsLoadingState />}
          {!loading &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
