import { LoginFormData } from "@/types/forms/login";
import { api } from "@/services";

export const authService = {
  login: async (data: LoginFormData) => {
    const result = await api.post<unknown>("/auth/login", data);

    return result;
  },

  getProfile: () => api.get<unknown>("/auth/me"),
};
