import React from "react";

import { fireEvent, screen } from "@testing-library/react";
import { render } from "@/tests/utils";

import Input from "./Input";

describe("Input Component", () => {
  it("Should render the input element", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should apply custom className", () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveClass("custom-class");
  });

  it("Should forward the ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("Should handle type prop correctly", () => {
    render(<Input type="password" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("Should disable when the disabled prop is set", () => {
    render(<Input disabled />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });

  it("Should render placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should call onChange handler when typing with correct value", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();

    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("Should call onFocus handler when focused", () => {
    const handleFocus = jest.fn();
    render(<Input onFocus={handleFocus} />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();
    expect(handleFocus).toHaveBeenCalledTimes(1);
  });

  it("Should call onBlur handler when blurred", () => {
    const handleBlur = jest.fn();
    render(<Input onBlur={handleBlur} />);
    const inputElement = screen.getByRole("textbox");
    inputElement.focus();
    inputElement.blur();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("Should match the snapshot", () => {
    const { asFragment } = render(<Input />);
    expect(asFragment()).toMatchSnapshot();
  });
});
