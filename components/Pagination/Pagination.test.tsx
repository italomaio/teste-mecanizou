import { fireEvent, render, screen } from "@/tests/utils";
import { Pagination } from "@/components";

describe("Pagination", () => {
  const onChangePageMock = jest.fn();

  it("Should render correctly", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("Should render 3 pages buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    expect(screen.getAllByTestId(/page/i)).toHaveLength(3);
  });

  it("Should call disable previous button when first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    expect(screen.getByLabelText(/previous/i)).toBeDisabled();
  });

  it("Should call disable next button when last page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    expect(screen.getByLabelText(/next/i)).toBeDisabled();
  });

  it("Should call onPageChange when click on item", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Go to page 1" }));
    expect(onChangePageMock).toHaveBeenCalledWith(1);
  });

  it("Should match snapshot", () => {
    const { asFragment } = render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onChangePageMock}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
