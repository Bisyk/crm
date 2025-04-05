import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  const { shop } = await getUser();

  const employees = prisma.employee.findMany({
    where: {
      shopId: shop.id,
    },
  });

  return employees;
};
