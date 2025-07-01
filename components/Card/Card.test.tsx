import React from "react";
import Card from "./Card";
import { render } from "@/tests/utils";

describe("Card Component", () => {
  it("Should render without crashing", () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("Should apply custom className", () => {
    const { container } = render(<Card className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("Should forward ref to the underlying div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("Should render children correctly", () => {
    const { getByText } = render(<Card>Test Content</Card>);
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("Should apply default styles", () => {
    const { container } = render(<Card />);
    expect(container.firstChild).toHaveClass(
      "bg-white shadow-md rounded-md p-4 dark:bg-zinc-800 dark:text-white dark:border dark:border-zinc-700 dark:shadow-none"
    );
  });

  it("Should match the snapshot", () => {
    const { asFragment } = render(<Card>Snapshot Content</Card>);
    expect(asFragment()).toMatchSnapshot();
  });
});
