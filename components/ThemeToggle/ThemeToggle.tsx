"use client";

import React, { useMemo } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components";
import { Lightbulb, LightbulbOff } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const Icon = useMemo(
    () =>
      ({
        light: LightbulbOff,
        dark: Lightbulb,
      }[theme || "light"]),
    [theme]
  );

  if (!theme) return null;

  return (
    <Button
      aria-label="Toggle Theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {Icon && <Icon />}
    </Button>
  );
};

export default ThemeToggle;
