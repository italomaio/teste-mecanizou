import { render } from "@/tests/utils";
import { screen, fireEvent } from "@testing-library/react";
import { Search } from "lucide-react";

import Button from "./Button";

describe("Button Component", () => {
  it("Should render button with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-white bg-sapphire");
  });

  it("Should apply the correct variant class", () => {
    render(<Button variant="secondary">Login</Button>);
    const button = screen.getByRole("button", { name: /Login/i });
    expect(button).toHaveClass("bg-hot-cinnamon text-white");
  });

  it("Should apply the correct size class", () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("px-6 py-3 text-lg");
  });

  it("Should render icon button", () => {
    render(
      <Button size="icon">
        <Search />
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
    expect(button).toHaveClass("p-2 text-base");
  });

  it("Should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should apply custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: /custom/i });
    expect(button).toHaveClass("custom-class");
  });

  it("Should render as disabled when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<Button>Snapshot Test</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
