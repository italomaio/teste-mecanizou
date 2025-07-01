import { useCallback, useEffect, useState } from "react";
import { useCookies } from "@/hooks";
import { authService } from "@/services/auth";
import { UserProfile } from "@/types/modules/auth";
import { redirect } from "next/navigation";

interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

export const useAuth = () => {
  const { value: token, deleteCookie } = useCookies("token");
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: !!token,
    user: null,
  });

  const logout = async () => {
    const result = await authService.logout();

    if (!result.error)
      setAuthState(() => {
        return { isAuthenticated: false, user: null };
      });

    redirect("/auth/login");
  };

  const fetchUserData = useCallback(async () => {
    const result = await authService.getProfile();

    if (!result.error)
      setAuthState((prev) => ({
        ...prev,
        user: result.data?.user as UserProfile,
      }));
  }, []);

  useEffect(() => {
    (() => {
      fetchUserData();
    })();
  }, [token]);

  return {
    ...authState,
    logout,
  };
};
