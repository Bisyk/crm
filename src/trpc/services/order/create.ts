import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import * as orderItemService from "../orderItem";
import { OrderItem } from "@/types/shared";

interface CreateOrderInput {
  orderDate: string;
  customerId: string;
  employeeId: string;
  paymentStatus: string;
  deliveryStatus: string;
  orderItems: OrderItem[];
}

export const create = async ({
  orderDate,
  customerId,
  employeeId,
  orderItems,
  paymentStatus,
  deliveryStatus,
}: CreateOrderInput) => {
  const { shop } = await getUser();

  const isoTimeString = new Date(orderDate).toISOString();

  try {
    const order = await prisma.order.create({
      data: {
        orderDate: isoTimeString,
        customerId,
        employeeId,
        paymentStatus,
        deliveryStatus,
        shopId: shop.id,
      },
    });

    orderItems.forEach(async i => {
      const createdOrderItem = orderItemService.create(
        Object.assign(i, { orderId: order.id })
      );
    });

    return order;
  } catch (error) {
    console.error(error);
  }
};
