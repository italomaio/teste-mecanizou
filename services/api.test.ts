import { fetchApi, api } from "./api";

describe("fetchApi", () => {
  const TEST_ENDPOINT = "/test-endpoint";
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("Should make a successful API call", async () => {
    const mockData = { success: true };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchApi(TEST_ENDPOINT);

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}${TEST_ENDPOINT}`,
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
    expect(result).toEqual({ data: mockData, error: null });
  });

  it("Should handle API error response", async () => {
    const errorMessage = "Not Found";
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      json: () => Promise.resolve({ message: errorMessage }),
    });

    const result = await fetchApi(TEST_ENDPOINT);

    expect(result).toEqual({
      data: null,
      error: {
        message: errorMessage,
        status: 404,
      },
    });
  });

  it("Should handle network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    const result = await fetchApi(TEST_ENDPOINT);

    expect(result).toEqual({
      data: null,
      error: {
        message: "Network Error",
        status: 500,
      },
    });
  });

  it("Should handle missing BASE_URL", async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    const result = await fetchApi(TEST_ENDPOINT);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(result).toEqual({
      data: null,
      error: {
        message: "API_URL is not defined in environment variables",
        status: 500,
      },
    });
  });
});

describe("api methods", () => {
  const TEST_ENDPOINT = "/test-endpoint";
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  beforeEach(() => {
    global.fetch = jest.fn();
    process.env.NEXT_PUBLIC_API_URL = BASE_URL;
  });

  it("Should call fetchApi with GET method", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const result = await api.get(TEST_ENDPOINT);

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}${TEST_ENDPOINT}`,
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(result.data).toEqual({ success: true });
    expect(result.error).toBeNull();
  });

  it("Should call fetchApi with POST method", async () => {
    const postData = { key: "value" };
    const mockResponse = { success: true };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await api.post(TEST_ENDPOINT, postData);

    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}${TEST_ENDPOINT}`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(postData),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );

    // Assert the result matches the mock response
    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });
});
