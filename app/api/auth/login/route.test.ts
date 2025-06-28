import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "./route";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mocked-jwt-token"),
}));

describe("POST /api/auth/login", () => {
  const credentials = {
    email: "italomaio@gmail.com",
    password: "123456",
  };

  it("Should return success (200), { success: true } and set response cookie", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        const cookies = res.headers.get("set-cookie");

        expect(res.status).toBe(200);
        expect(cookies).toContain("token=mocked-jwt-token");
        expect(data).toEqual({ success: true });
      },
    });
  });

  it("Should return error (400) when email or password is missing", async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "POST",
          body: JSON.stringify({ email: "", password: "" }),
        });

        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data).toEqual({ error: "Email and password are required" });
      },
    });
  });
});
