import { NextResponse, NextRequest } from "next/server";
import data from "@/data/products.json";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);

  const skip = parseInt(url.searchParams.get("skip") || "0", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  const products = data.slice(skip, skip + limit);

  return NextResponse.json({ products, total: data.length, skip, limit });
}
