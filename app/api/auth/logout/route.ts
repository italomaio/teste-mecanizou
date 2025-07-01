import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("token", "", { maxAge: 0, path: "/" });

  return response;
}
