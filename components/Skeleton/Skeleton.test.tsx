import { render } from "@/tests/utils";
import { Skeleton } from "@/components";

describe("Skeleton", () => {
  it("Should render correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container).toBeInTheDocument();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
