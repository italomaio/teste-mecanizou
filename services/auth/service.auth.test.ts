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
});
