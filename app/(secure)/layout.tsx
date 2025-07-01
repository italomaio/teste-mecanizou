import { Navbar } from "@/components";
import React from "react";

export const metadata = {
  title: "Secure Page",
  description: "This is a secure section of the application.",
};

export default function SecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-200 dark:bg-zinc-900 dark:text-white h-screen w-screen flex flex-col flex-1 overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
