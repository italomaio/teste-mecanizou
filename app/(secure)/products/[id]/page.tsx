import React from "react";

import {
  Button,
  Label,
  ProductImages,
  ProductPrices,
  ProductQuantity,
  ProductRating,
  ProductReviews,
} from "@/components";

import { productsService } from "@/services/products/service";
import { ShoppingBasket } from "lucide-react";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const res = await productsService.getAll();
  const products = res.data?.products || [];
  return products.map((p) => ({ id: p.id.toString() }));
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;

  const { data } = await productsService.getById(id?.toString() || "", {
    next: {
      revalidate: 60,
    },
  });

  if (!data?.product) redirect("/products");

  return (
    <main className="w-full h-full flex flex-col flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 overflow-y-scroll hide-scrollbar min-h-full pb-5">
        <article className="flex flex-col container mx-auto lg:flex-row lg:mt-10">
          <figure className="lg:w-1/2 md:w-full p-5">
            <ProductImages images={data.product.images} />
          </figure>
          <section className="lg:w-1/2 md:w-full p-5 space-y-3">
            <header>
              <h1>
                <Label className="text-xl font-bold">
                  {data?.product.title}
                </Label>
              </h1>
              <ProductRating
                rating={data.product.rating}
                reviewsCount={data?.product.reviews.length}
              />
            </header>

            <p className="font-light">{data?.product.description}</p>

            <ProductPrices
              price={data?.product.price}
              discount={data?.product.discountPercentage}
            />
            <form>
              <div className="flex flex-row gap-2 items-end">
                <ProductQuantity min={data.product.minimumOrderQuantity} />
                <Button type="submit" className="w-1/3">
                  <ShoppingBasket />
                  Comprar
                </Button>
              </div>
            </form>
          </section>
        </article>

        <ProductReviews reviews={data.product.reviews} />
      </div>
    </main>
  );
};

export default ProductPage;
