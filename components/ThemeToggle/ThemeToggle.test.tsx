import React from "react";
import { fireEvent, render, screen, waitFor } from "@/tests/utils";
import { useTheme } from "next-themes";

import ThemeToggle from "./ThemeToggle";
import { ButtonProps } from "../Button/Button";

jest.mock("@/components", () => ({
  Button: ({ children, onClick, ...props }: ButtonProps) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("lucide-react", () => ({
  Lightbulb: () => <svg data-testid="lightbulb-icon" />,
  LightbulbOff: () => <svg data-testid="lightbulb-off-icon" />,
}));

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.Mock;

describe("ThemeToggle", () => {
  let mockSetTheme: jest.Mock;

  beforeEach(() => {
    mockSetTheme = jest.fn();
    mockUseTheme.mockClear();
  });

  it("Should render correctly", () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });

    render(<ThemeToggle />);
    expect(screen.getByLabelText(/Toggle Theme/)).toBeInTheDocument();
  });

  it('Should render the LightbulbOff icon and "Switch to dark mode" title when theme is light', () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("title", "Switch to dark mode");
    expect(screen.getByTestId("lightbulb-off-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("lightbulb-icon")).not.toBeInTheDocument();
  });

  it('Should render the Lightbulb icon and "Switch to light mode" title when theme is dark', () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });

    render(<ThemeToggle />);

    const toggleButton = screen.getByRole("button", { name: "Toggle Theme" });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("title", "Switch to light mode");
    expect(screen.getByTestId("lightbulb-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("lightbulb-off-icon")).not.toBeInTheDocument();
  });

  it("Should not render when theme is null", () => {
    mockUseTheme.mockReturnValue({ theme: undefined, setTheme: mockSetTheme });
    render(<ThemeToggle />);

    expect(screen.queryByLabelText(/Toggle Theme/i)).toBeNull();
  });

  it("Should call setTheme on Click", async () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });
    render(<ThemeToggle />);

    fireEvent.click(screen.getByLabelText(/Toggle Theme/));

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalled();
    });
  });
});
