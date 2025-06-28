import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "./PasswordInput";

describe("PasswordInput", () => {
  it("Should render the input field", () => {
    render(<PasswordInput />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("Should render the password toggle button", () => {
    render(<PasswordInput />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Should hide the password by default", () => {
    render(<PasswordInput />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "password");
  });

  it("Should toggle the password visibility when the button is clicked", () => {
    render(<PasswordInput />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // Initially hidden
    expect(input).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(button);
    expect(input).toHaveAttribute("type", "text");

    // Click to hide password again
    fireEvent.click(button);
    expect(input).toHaveAttribute("type", "password");
  });

  it("Should pass additional props to the input field", () => {
    render(<PasswordInput placeholder="Enter your password" />);
    const input = screen.getByPlaceholderText("Enter your password");
    expect(input).toBeInTheDocument();
  });

  it("Should apply the provided className to the input field", () => {
    render(<PasswordInput className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("Should match the snapshot", () => {
    const { asFragment } = render(<PasswordInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
