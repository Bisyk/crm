import prisma from "@/lib/prisma";

export const getAll = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: {
          select: { name: true },
        },
        category: {
          select: { name: true },
        },
      },
    });

    console.log(products);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
