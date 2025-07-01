import { api } from "@/services";
import {
  ProductQuery,
  ProductResponse,
  ProductsResponse,
} from "@/types/modules/products";

export const productsService = {
  getAll: async (data?: ProductQuery, opts?: RequestInit) => {
    const queryString = new URLSearchParams(
      data as Record<string, string>
    ).toString();

    const result = await api.get<ProductsResponse>(
      `/products` + `${queryString && "?" + queryString}`,
      opts
    );

    return result;
  },
  getById: async (id: string, opts?: RequestInit) => {
    const result = await api.get<ProductResponse>(`/products/${id}`, opts);
    return result;
  },
};
