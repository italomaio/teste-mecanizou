import React from "react";
import { render, screen, fireEvent } from "@/tests/utils";
import ProductImages from "./ProductImages";

describe("ProductImages", () => {
  const mockImages: string[] = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

  it("Should render correctly", () => {
    const { container } = render(<ProductImages images={mockImages} />);
    expect(container).toBeInTheDocument();
  });

  it("Should change image on click thumbnail", () => {
    render(<ProductImages images={mockImages} />);
    fireEvent.click(screen.getByLabelText(/View image 1/i));
    expect(screen.getByLabelText(/Current product image/i)).toHaveAttribute(
      "src",
      mockImages[0]
    );
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<ProductImages images={mockImages} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
