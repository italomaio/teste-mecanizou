import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "./route";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("GET /api/auth/me", () => {
  const user = {
    email: "italomaio@gmail.com",
    password: "123456",
  };

  beforeEach(() => {
    (jwt.verify as jest.Mock).mockReset();
  });

  it("Should return user data with valid token", async () => {
    (jwt.verify as jest.Mock).mockReturnValue(user);

    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            cookie: "token=valid-token",
          },
        });

        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ user: user });
      },
    });
  });

  it("Should return 401 when no token cookie present", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
        });

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({
          error: "Unauthorized",
        });
      },
    });
  });

  it("Should return 401 when token is invalid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "GET",
          headers: {
            cookie: "token=invalid-token",
          },
        });

        expect(res.status).toBe(401);
        expect(await res.json()).toEqual({
          error: "Invalid token",
        });
      },
    });
  });
});
