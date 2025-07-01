import { calculateDiscountPrice } from "@/utils/money";
import { Label } from "@/components";

const ProductPrices: React.FC<{ price: number; discount: number }> = ({
  price,
  discount,
}) => {
  const prices = calculateDiscountPrice(price, discount);

  return (
    <div className="flex flex-col py-2">
      <Label className="text-gray-500 dark:text-zinc-500 line-through italic mb-0">
        {prices.oldPrice}
      </Label>
      <Label className="text-3xl font-bold dark:text-hot-cinnamon text-sapphire">
        {prices.newPrice}
      </Label>
    </div>
  );
};

export default ProductPrices;
