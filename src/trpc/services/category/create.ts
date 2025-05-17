import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const create = async ({ name }: { name: string }) => {
  const { shop } = await getUser();

  try {
    const category = await prisma.category.create({
      data: {
        name,
        shopId: shop.id,
      },
    });

    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Failed to create category");
  }
};
