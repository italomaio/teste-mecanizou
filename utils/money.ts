export const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export function calculateDiscountPrice(
  price: number,
  discountPercentage: number
) {
  const discountFactor = discountPercentage / 100;
  const newPrice = price * (1 - discountFactor);

  return {
    oldPrice: formatter.format(price),
    newPrice: formatter.format(newPrice),
  };
}
