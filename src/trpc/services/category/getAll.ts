import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  const { shop } = await getUser();

  const categories = await prisma.category.findMany({
    where: { shopId: shop.id },
    orderBy: { createdAt: "asc" },
  });

  return categories;
};
