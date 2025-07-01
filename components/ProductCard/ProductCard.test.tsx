import { fireEvent, render, screen } from "@/tests/utils";
import { ProductCard } from "@/components";
import { useRouter } from "next/navigation";

const product = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  stock: 99,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "BEA-ESS-ESS-001",
  weight: 4,
  dimensions: {
    width: 15.14,
    height: 13.08,
    depth: 22.99,
  },
  warrantyInformation: "1 week warranty",
  shippingInformation: "Ships in 3-5 business days",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 3,
      comment: "Would not recommend!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
    {
      rating: 4,
      comment: "Very satisfied!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Lucas Gordon",
      reviewerEmail: "lucas.gordon@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Highly impressed!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
  ],
  returnPolicy: "No return policy",
  minimumOrderQuantity: 48,
  meta: {
    createdAt: "2025-04-30T09:41:02.053Z",
    updatedAt: "2025-04-30T09:41:02.053Z",
    barcode: "5784719087687",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
  },
  images: [
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
  ],
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
};

describe("ProductCard", () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
    });
  });

  it("Should render correctly", () => {
    const { container } = render(<ProductCard product={product} />);
    expect(container).toBeInTheDocument();
  });

  it("Should redirect on click", () => {
    render(<ProductCard product={product} />);
    fireEvent.click(screen.getByRole("button", { name: /Buy/i }));
    expect(routerPushMock).toHaveBeenCalled();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<ProductCard product={product} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
