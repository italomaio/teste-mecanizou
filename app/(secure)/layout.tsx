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
  return <div className="secure-layout">{children}</div>;
}
