import prisma from "@/lib/prisma";

export const getAll = async () => {
  const categories = prisma.category.findMany();

  return categories;
};
