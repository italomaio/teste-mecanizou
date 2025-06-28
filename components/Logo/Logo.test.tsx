import React from "react";
import { render } from "@testing-library/react";
import Logo, { LogoProps } from "./Logo";

describe("Logo Component", () => {
  const renderLogo = (props: Partial<LogoProps> = {}) => {
    const defaultProps: LogoProps = {
      animate: true,
      bordered: true,
      className: "",
    };
    return render(<Logo {...defaultProps} {...props} />);
  };

  it("Should render the logo image", () => {
    const { getByAltText } = renderLogo();
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).toBeInTheDocument();
  });

  it("Should apply animation class when animate is true", () => {
    const { getByAltText } = renderLogo({ animate: true });
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).toHaveClass("scale-transition");
  });

  it("Should not apply animation class when animate is false", () => {
    const { getByAltText } = renderLogo({ animate: false });
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).not.toHaveClass("scale-transition");
  });

  it("Should apply border class when bordered is true", () => {
    const { getByAltText } = renderLogo({ bordered: true });
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).toHaveClass("border border-white");
  });

  it("Should not apply border class when bordered is false", () => {
    const { getByAltText } = renderLogo({ bordered: false });
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).not.toHaveClass("border border-white");
  });

  it("Should apply custom className", () => {
    const customClass = "custom-class";
    const { getByAltText } = renderLogo({ className: customClass });
    const logoImage = getByAltText("Logo mecanizou");
    expect(logoImage).toHaveClass(customClass);
  });

  it("Should match the snapshot", () => {
    const { asFragment } = renderLogo();
    expect(asFragment()).toMatchSnapshot();
  });
});
