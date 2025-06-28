import React from "react";
import RootProviders from "./RootProviders";

import { render } from "@/tests/utils";
import { waitFor } from "@testing-library/react";

describe("RootProviders", () => {
  const CHILD_CONTENT = "App Content";

  it("Should render children correctly", async () => {
    const screen = render(
      <RootProviders>
        <div>{CHILD_CONTENT}</div>
      </RootProviders>
    );

    expect(screen.getByText(CHILD_CONTENT)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("mock-theme-provider")).toBeInTheDocument();
    });
  });

  it("Should render without crashing", () => {
    const { container } = render(
      <RootProviders>
        <div>Another Child</div>
      </RootProviders>
    );

    expect(container).toBeTruthy();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(
      <RootProviders>
        <div>Snapshot Test</div>
      </RootProviders>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
