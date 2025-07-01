import { render, fireEvent, screen } from "@/tests/utils";
import { ProductQuantity } from "@/components";

describe("ProductQuantity", () => {
  it("Should render correctly", () => {
    const { container } = render(<ProductQuantity min={10} />);
    expect(container).toBeInTheDocument();
  });

  it("Should call onChange", () => {
    const onChangeMock = jest.fn();
    render(<ProductQuantity min={10} onChangeValue={onChangeMock} />);
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: 1 },
    });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(<ProductQuantity min={10} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
