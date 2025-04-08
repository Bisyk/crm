import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to fetch product. Please try again later.");
  }
};
