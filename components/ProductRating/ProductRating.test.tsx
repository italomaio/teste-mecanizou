import { render } from "@/tests/utils";
import { ProductRating } from "@/components";

describe("ProductRating", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductRating rating={3} reviewsCount={2} />);
    expect(container).toBeInTheDocument();
  });
});
