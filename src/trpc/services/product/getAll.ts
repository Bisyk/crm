import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  const { shop } = await getUser();

  try {
    const products = await prisma.product.findMany({
      where: {
        shopId: shop.id,
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
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
