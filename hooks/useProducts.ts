import { productsService } from "@/services/products/service";
import { ProductQuery, ProductState } from "@/types/modules/products";
import { useState, useCallback, useEffect } from "react";

const useProducts = () => {
  const [state, setState] = useState<ProductState>({
    products: [],
    loading: false,
    error: null,
    total: 0,
    skip: 0,
    limit: 10,
  });

  const fetchProducts = useCallback(async (query?: ProductQuery) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await productsService.getAll(query);
      const errorMessage = response.error?.message || null;

      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
        products: response.data?.products || [],
        total: response.data?.total || 0,
        skip: response.data?.skip || 0,
        limit: response.data?.limit || 10,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: (error as Error).message || "Unexpected error",
      }));
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { ...state, fetchProducts };
};

export { useProducts };
