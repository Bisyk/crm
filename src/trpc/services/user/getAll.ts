import prisma from "../../../lib/prisma";

export const getAll = () => {
  return prisma.user.findMany();
};
