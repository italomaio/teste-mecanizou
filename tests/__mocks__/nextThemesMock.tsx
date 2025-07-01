import { ThemeProviderProps } from "next-themes";

export const mockSetThemeFunction = jest.fn();

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme,
  themes,
  enableSystem,
}: ThemeProviderProps) => (
  <div
    data-testid="mock-theme-provider"
    data-attribute={attribute}
    data-default-theme={defaultTheme}
    data-themes={JSON.stringify(themes)}
    data-enable-system={String(enableSystem)}
  >
    {children}
  </div>
);

export const useTheme = jest.fn(() => ({
  theme: "dark",
  setTheme: mockSetThemeFunction,
}));
