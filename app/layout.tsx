import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/assets/styles/globals.css";
import { RootProviders } from "@/components";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Mecanizou Store",
  description: "Find everything you need for your car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased h-screen w-screen flex overflow-hidden`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
