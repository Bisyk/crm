import prisma from "@/lib/prisma";

interface UpdateProductInput {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  brandId: string;
  categoryId: string;
  imageUrl?: string;
  lowStockThreshold?: number;
}

export const update = (id: string, data: UpdateProductInput) => {
  try {
    const updatedProduct = prisma.product.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};
