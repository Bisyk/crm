import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  try {
    const { shop } = await getUser();

    const customers = prisma.customer.findMany({
      where: {
        shopId: shop.id,
      },
    });

    return customers;
  } catch (error) {
    console.log("Failed to fetch customers");
    return null;
  }
};
