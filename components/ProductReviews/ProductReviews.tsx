import React from "react";
import { Card, Label, Stars } from "@/components";
import { type ProductReviews as ProductReviewsType } from "@/types/modules/products";

export type ProductReviewsProps = {
  reviews: ProductReviewsType[];
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <article id="reviews" className="container mx-auto mt-5 px-5">
      <header>
        <h2>
          <Label className="font-bold text-xl">What our customers saying</Label>
        </h2>
      </header>

      <Card>
        {reviews?.map((review, index) => (
          <article
            className="flex md:flex-row py-4 flex-col border-b md:border-b-0 dark:border-zinc-700 border-gray-300 last:border-b-0"
            key={index}
          >
            <header className="md:border-r dark:border-zinc-700 border-gray-300 min-w-60 p-2">
              <h4 className="font-bold">{review.reviewerName}</h4>
              <p className="text-xs dark:text-zinc-400 text-gray-400">
                {review.reviewerEmail}
              </p>
            </header>
            <div className="md:p-2 md:ml-5 ml-2 mt-2 md:mt-0 flex flex-col">
              <Stars rating={review.rating} />
              <Label className="text-xs my-2 text-gray-400 dark:text-zinc-400">
                {new Date(review.date).toLocaleDateString()}
              </Label>
              <p>{review.comment}</p>
            </div>
          </article>
        ))}
      </Card>
    </article>
  );
};

export default ProductReviews;
