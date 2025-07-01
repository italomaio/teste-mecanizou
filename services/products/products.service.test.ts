import { productsService } from "./service";

describe("ProductsService", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it("Should be defined", () => {
    expect(productsService).toBeDefined();
  });

  it("Should return products", async () => {
    const mockResponse = { products: [] };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await productsService.getAll();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/products"),
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("Should return specific product", async () => {
    const mockResponse = { product: { id: "1" } };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await productsService.getById("1");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/products/1"),
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });
});
