"use client";

import React, { useState } from "react";
import Image from "next/image";

export type ProductImageProps = {
  images: string[];
};

const ProductImages: React.FC<ProductImageProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);

  return (
    <div className="flex flex-row-reverse ">
      <div className="relative w-full aspect-[16/9]">
        <Image
          className="object-contain"
          src={currentImage}
          alt="Product Image"
          placeholder="empty"
          fill={true}
          priority={true}
          role="img"
          aria-label="Current product image"
        />
      </div>
      <div className="flex flex-col gap-2">
        {images.map((x, index) => (
          <Image
            aria-label={`View image ${index + 1}`}
            aria-pressed={currentImage === x}
            key={x}
            role="button"
            className="object-contain border border-gray-300 dark:border-zinc-700 p-2 rounded-sm cursor-pointer focus-visible-ring hover:dark:border-zinc-600 hover:dark:bg-zinc-700"
            src={x}
            alt="Product Image"
            width={70}
            height={70}
            loading="lazy"
            onClick={() => setCurrentImage(x)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
