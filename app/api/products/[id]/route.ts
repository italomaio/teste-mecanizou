import { NextResponse } from "next/server";
import products from "@/data/products.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const product = products.find((product) => product.id === Number(id));

  return NextResponse.json({ product });
}
