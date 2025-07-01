import { render } from "@/tests/utils";
import { Loader } from "@/components";

describe("Loader", () => {
  it("Should render correctly", () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
