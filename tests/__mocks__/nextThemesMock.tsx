import { ThemeProviderProps } from "next-themes";

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme,
  themes,
  enableSystem,
}: // ...otherProps
ThemeProviderProps) => (
  <div
    data-testid="mock-theme-provider"
    data-attribute={attribute}
    data-default-theme={defaultTheme}
    data-themes={JSON.stringify(themes)}
    data-enable-system={String(enableSystem)}
    // {...otherProps}
  >
    {children}
  </div>
);
