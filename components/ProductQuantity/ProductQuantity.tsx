"use client";

import React from "react";
import { Label, Input } from "@/components";

interface ProductQuantityProps {
  min: number;
  onChangeValue?: (value: string) => void;
}

const ProductQuantity: React.FC<ProductQuantityProps> = ({
  min,
  onChangeValue,
}) => {
  return (
    <div className="w-1/6 flex flex-col mb-[2px]">
      <Label htmlFor="qty">Quantidade:</Label>
      <Input
        aria-label="Quantity"
        aria-required="true"
        id="qty"
        type="number"
        value={min}
        min={min}
        onChange={(e) => onChangeValue?.(e.target.value)}
      />
    </div>
  );
};

export default ProductQuantity;
