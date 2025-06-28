export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
};

export type ErrorWithCause = Error & {
  cause?: {
    status: number;
    statusText: string;
  };
};
