import { fireEvent, render, screen, waitFor } from "@/tests/utils";
import { UserDropdown } from "@/components";

describe("UserDropdown", () => {
  const onUserLogout = jest.fn();
  const user = { email: "email@teste.com" };

  it("Should render correctly", () => {
    const { container } = render(
      <UserDropdown user={user} onLogout={onUserLogout} />
    );

    expect(container).toBeInTheDocument();
  });

  it("Should open menu on click", async () => {
    render(<UserDropdown user={user} onLogout={onUserLogout} />);

    fireEvent.click(screen.getByLabelText(/User menu/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/menu-items/i)).toBeInTheDocument();
    });
  });

  it("Should call onLogout when click logout button", async () => {
    render(<UserDropdown user={user} onLogout={onUserLogout} />);

    fireEvent.click(screen.getByLabelText(/User menu/i));

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText(/Logout/i));
      expect(onUserLogout).toHaveBeenCalled();
    });
  });
});
