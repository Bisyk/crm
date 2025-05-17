import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  const { shop } = await getUser();

  try {
    const orders = prisma.order.findMany({
      where: { shopId: shop.id },
      include: {
        customer: {
          select: { firstName: true, lastName: true },
        },
        employee: {
          select: { firstName: true, lastName: true },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
};
