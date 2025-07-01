import { useState, useEffect } from "react";

function useCookies(cookieName: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    };

    setValue(getCookie(cookieName));
  }, [cookieName]);

  const setCookie = (value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/`;
    setValue(value);
  };

  const deleteCookie = () => {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    setValue(null);
  };

  return { value, setCookie, deleteCookie };
}

export { useCookies };
