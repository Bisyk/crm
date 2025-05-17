import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stockCount: number;
  brandId: string;
  categoryId: string;
  imageUrl?: string;
  lowStockThreshold?: number;
}

export const create = async ({
  name,
  description,
  price,
  stockCount,
  brandId,
  categoryId,
  imageUrl,
  lowStockThreshold,
}: CreateProductInput) => {
  const { shop } = await getUser();

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stockCount,
        lowStockThreshold,
        brandId,
        categoryId,
        imageUrl,
        shopId: shop.id,
      },
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};
