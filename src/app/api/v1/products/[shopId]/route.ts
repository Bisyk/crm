import { trpc } from "@/trpc/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { shopId: string } }
) {
  const { shopId } = params;

  const products = await trpc.product.getAllByShopId(shopId);

  if (!products || products.length === 0) {
    return Response.json(
      { message: "No products found for this shop." },
      { status: 404 }
    );
  }

  return Response.json({ products });
}
