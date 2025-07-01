import { render } from "@/tests/utils";
import { ProductReviews } from "@/components";

const reviews = [
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
];

describe("ProductReviews", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductReviews reviews={reviews} />);
    expect(container).toBeInTheDocument();
  });
});
