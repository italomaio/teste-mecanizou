import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const isProd = process.env.NODE_ENV === "production";
const isE2E = !!process.env.PLAYWRIGHT;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password)
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );

  const res = NextResponse.json({ success: true });

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET);

  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: isProd && !isE2E,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}
