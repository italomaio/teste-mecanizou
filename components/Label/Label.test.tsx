import { render } from "@/tests/utils";
import { screen } from "@testing-library/react";

import Label from "./Label";
import React from "react";

describe("Label Component", () => {
  it("Should render the label with children", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("Should apply custom className", () => {
    render(<Label className="custom-class">Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveClass("custom-class");
  });

  it("Should forward additional props to the label element", () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveAttribute("for", "test-input");
  });

  it("Should handle ref forwarding", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it("Should apply default styles", () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toHaveClass(
      "inline-block p-0 mb-2 text-left font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800 dark:text-white"
    );
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<Label>Test Label</Label>);
    expect(asFragment()).toMatchSnapshot();
  });
});
