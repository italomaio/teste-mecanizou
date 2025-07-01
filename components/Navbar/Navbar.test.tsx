import React from "react";
import { render, screen, fireEvent } from "@/tests/utils";
import Navbar from "./Navbar";
import { useAuth } from "@/hooks";
import {
  ButtonProps,
  LabelProps,
  LogoProps,
  UserDropdownProps,
} from "@/components";

jest.mock("@/components", () => ({
  Button: ({ children, ...props }: ButtonProps) => (
    <button {...props}>{children}</button>
  ),
  Label: ({ children }: LabelProps) => <label>{children}</label>,
  Logo: ({ className }: LogoProps) => <div className={className}>Logo</div>,
  UserDropdown: ({ user, onLogout }: UserDropdownProps) => (
    <div data-testid="user-dropdown-mock">
      <span
        role="button"
        aria-label="User menu"
        data-testid="user-name-display"
      >
        {user?.email}
      </span>
      <button onClick={onLogout} aria-label="Logout dropdown">
        Logout
      </button>
    </div>
  ),
  ThemeToggle: () => <button>ThemeToggle</button>,
}));

describe("Navbar", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: "Test User" },
      logout: mockLogout,
    });
  });

  it("Should render correctly", () => {
    const { container } = render(<Navbar />);
    expect(container).toBeInTheDocument();
  });

  it("Should render the theme toggle button", () => {
    render(<Navbar />);
    expect(screen.getByText("ThemeToggle")).toBeInTheDocument();
  });

  it("Should call logout when logout button is clicked in the dropdown", () => {
    render(<Navbar />);
    const logoutButtonInDropdown = screen.getByRole("button", {
      name: "Logout dropdown",
    });

    fireEvent.click(logoutButtonInDropdown);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("Should toggle the mobile menu when the menu button is clicked", () => {
    render(<Navbar />);

    const menuButton = screen.getByLabelText("Open menu");
    const mobileMenu = screen.getByLabelText("Mobile menu");

    expect(mobileMenu).toHaveClass("translate-y-0");
    expect(mobileMenu).not.toHaveClass("-translate-y-full");

    fireEvent.click(menuButton);

    expect(mobileMenu).not.toHaveClass("translate-y-0");
    expect(mobileMenu).toHaveClass("-translate-y-full");
  });

  it("Should call logout when logout button is clicked in the mobile menu", () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText("Open menu");

    fireEvent.click(menuButton);
    fireEvent.click(
      screen.getByRole("button", { name: /Logout by mobile menu/i })
    );

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
