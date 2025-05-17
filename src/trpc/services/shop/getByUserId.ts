import prisma from "@/lib/prisma";

export const getByUserId = (userId: string) => {
  const shops = prisma.shop.findMany({
    where: {
      ownerId: userId,
    },
  });

  return shops;
};
