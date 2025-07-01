import { authService } from "./service";

describe("AuthService", () => {
  const mockCredentials = {
    email: "italomaio@gmail.com",
    password: "123456",
  };

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it("Should be defined", () => {
    expect(authService).toBeDefined();
  });

  it("Should return a valid token when login is successful", async () => {
    const mockResponse = { token: "fake-jwt-token" };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await authService.login(mockCredentials);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockCredentials),
      })
    );

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("Should return success when logout", async () => {
    const mockResponse = { message: "Logged out successfully" };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await authService.logout();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/logout"),
      expect.objectContaining({
        method: "POST",
      })
    );

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("Should return user object", async () => {
    const mockResponse = { email: "test@email.com" };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await authService.getProfile();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/me"),
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });
});
