import prisma from "@/lib/prisma";

export const create = async ({
  name,
  ownerId,
}: {
  name: string;
  ownerId: string;
}) => {
  await prisma.shop.create({
    name,
    ownerId,
  });
};
