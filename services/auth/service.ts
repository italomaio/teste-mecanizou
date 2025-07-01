import { LoginFormData } from "@/types/forms/login";
import { api } from "@/services";
import { LoginResponse, UserProfileResponse } from "@/types/modules/auth";

export const authService = {
  login: async (data: LoginFormData) => {
    const result = await api.post<LoginResponse>("/auth/login", data);

    return result;
  },
  logout: async () => {
    const result = await api.post("/auth/logout", {});
    return result;
  },
  getProfile: () => api.get<UserProfileResponse>("/auth/me"),
};
