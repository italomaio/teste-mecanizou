import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get("token");

  if (!authCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(authCookie.value, process.env.JWT_SECRET) as {
      email: string;
    };

    return NextResponse.json({ user: { email: decoded.email } });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
