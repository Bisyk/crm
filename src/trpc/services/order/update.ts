import prisma from "@/lib/prisma";
import * as orderItemService from "../orderItem";
import { OrderItem } from "@/types/shared";

interface UpdateOrderInput {
  orderDate: string;
  customerId: string;
  employeeId: string;
  orderId: string;
  paymentStatus: string;
  deliveryStatus: string;
  orderItems: OrderItem[];
}

export const update = async ({
  orderDate,
  customerId,
  employeeId,
  orderItems,
  paymentStatus,
  deliveryStatus,
  orderId,
}: UpdateOrderInput) => {
  const isoTimeString = new Date(orderDate).toISOString();

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderDate: isoTimeString,
        customerId,
        employeeId,
        paymentStatus,
        deliveryStatus,
      },
    });

    if (!updatedOrder) return;

    orderItemService.deleteAllByOrderId(orderId);

    orderItemService.createMany(Object.assign(orderItems, { orderId }));

    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};
