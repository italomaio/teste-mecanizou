import { ApiResponse, ErrorWithCause } from "@/types/api";

export async function fetchApi<T>(
  endpoint: string,
  config: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!BASE_URL) {
      throw new Error("API_URL is not defined in environment variables");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message, {
        cause: {
          status: response.status,
          statusText: response.statusText,
        },
      });

    return {
      data,
      error: null,
    };
  } catch (error) {
    const err = error as ErrorWithCause;
    return {
      data: null,
      error: {
        message: err.message,
        status: err.cause?.status || 500,
      },
    };
  }
}

export const api = {
  get: <T>(endpoint: string, opts?: RequestInit) =>
    fetchApi<T>(endpoint, {
      method: "GET",
      ...opts,
    }),
  post: <T>(endpoint: string, data: unknown) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
