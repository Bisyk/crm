import prisma from "@/lib/prisma";

export const getAllByShopId = async (shopId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        shopId: shopId,
      },
      include: {
        brand: {
          select: { name: true },
        },
        category: {
          select: { name: true },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products by shop ID:", error);
    throw new Error("Failed to fetch products for the specified shop");
  }
};
