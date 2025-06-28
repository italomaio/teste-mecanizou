import { render } from "@testing-library/react";

const customRender = (ui: React.ReactElement, container?: HTMLElement) => {
  return render(ui, {
    container,
  });
};

export * from "@testing-library/react";
export { customRender as render };
