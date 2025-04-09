import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

interface CreateOrderInput {
  orderDate: string;
  customerId: string;
  employeeId: string;
  totalAmount: number;
}

export const create = async ({
  orderDate,
  customerId,
  employeeId,
  totalAmount,
}: CreateOrderInput) => {
  const { shop } = await getUser();

  const isoTimeString = new Date(orderDate).toISOString();

  try {
    const order = await prisma.order.create({
      data: {
        orderDate: isoTimeString,
        customerId,
        employeeId,
        totalAmount,
        shopId: shop.id,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
  }
};
