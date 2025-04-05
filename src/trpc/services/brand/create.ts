import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const create = async ({ name }: { name: string }) => {
  const { shop } = await getUser();

  try {
    const brand = await prisma.brand.create({
      data: {
        name,
        shopId: shop.id,
      },
    });

    return brand;
  } catch (error) {
    console.error("Error creating brand:", error);
    throw new Error("Failed to create brand");
  }
};
