"use client";

import React, { memo } from "react";
import { ProductLink, Label, Stars } from "@/components";

export type ProductRatingProps = {
  rating: number;
  reviewsCount: number;
  productId?: string;
};

const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewsCount,
  productId,
}) => {
  return (
    <div className="flex items-center gap-[2px] py-2">
      <Stars rating={rating} />
      <ProductLink productId={productId} className="">
        <Label className="text-xs m-0 px-1 cursor-pointer hover:underline">
          {reviewsCount} review{reviewsCount !== 1 ? "s" : ""}
        </Label>
      </ProductLink>
    </div>
  );
};

export default memo(ProductRating);
