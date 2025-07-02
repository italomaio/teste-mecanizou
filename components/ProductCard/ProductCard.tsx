"use client";

import React from "react";

import { Product } from "@/types/modules/products";
import {
  Label,
  Card,
  ProductLink,
  ProductRating,
  Button,
  ProductPrices,
} from "@/components";

import Image from "next/image";
import { useRouter } from "next/navigation";

export type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  return (
    <Card>
      <article className="flex flex-col h-full">
        <figure className="aspect-square flex items-center">
          <ProductLink
            productId={product.id.toString()}
            className="flex w-full justify-center items-center relative aspect-[16/9]"
          >
            <Image
              className="object-contain"
              placeholder="empty"
              src={product.thumbnail}
              alt={`Thumbnail for ${product.title}`}
              fill
            />
          </ProductLink>
        </figure>
        <header className="text-left flex flex-col justify-start">
          <ProductLink productId={product.id.toString()}>
            <Label className="block text-md m-0 cursor-pointer hover:underline lg:min-h-auto leading-tight">
              {product.title}
            </Label>
          </ProductLink>
        </header>

        <div className="flex flex-col items-start py-4 mt-auto">
          <ProductRating
            productId={product.id.toString()}
            rating={product.rating}
            reviewsCount={product.reviews.length}
          />

          <ProductPrices
            price={product.price}
            discount={product.discountPercentage}
          />

          <Button
            aria-label={`Buy ${product.title}`}
            onClick={() => router.push(`/products/${product.id}`)}
            variant="secondary"
            className="w-full"
          >
            Comprar
          </Button>
        </div>
      </article>
    </Card>
  );
};

export default ProductCard;
