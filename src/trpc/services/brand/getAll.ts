import prisma from "@/lib/prisma";

export const getAll = async () => {
  const brands = prisma.brand.findMany();

  return brands;
};
