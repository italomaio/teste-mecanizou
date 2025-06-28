import React, { PropsWithChildren } from "react";
import { ThemeProvider as MockedThemeProvider } from "./nextThemesMock";

const dynamic = jest.fn(() => {
  const DynamicMockComponent = (props: PropsWithChildren) => {
    return <MockedThemeProvider {...props} />;
  };

  DynamicMockComponent.displayName = "MockedDynamicComponentForThemeProvider";
  return DynamicMockComponent;
});

export default dynamic;
