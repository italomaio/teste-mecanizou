import { render, screen } from "@/tests/utils";
import { ProductLink } from "@/components";

describe("ProductLink", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductLink>Test</ProductLink>);
    expect(container).toBeInTheDocument();
  });

  it("Should render with correct href when productId is provided", () => {
    render(<ProductLink productId="1">Test</ProductLink>);
    const link = screen.getByRole("link", { name: /View product 1/i });
    expect(link).toHaveAttribute("href", "/products/1");
  });

  it("Should render with correct href when productId is not provided", () => {
    render(<ProductLink>Test</ProductLink>);
    const link = screen.getByRole("link", { name: /Go to reviews/i });
    expect(link).toHaveAttribute("href", "#reviews");
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(
      <ProductLink productId="1">Test</ProductLink>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
