"use client";

import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { ssr: false }
);

type RootProvidersProps = {
  children: React.ReactNode;
};

const RootProviders: React.FC<RootProvidersProps> = ({ children }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "dark"]}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
};

export default RootProviders;
