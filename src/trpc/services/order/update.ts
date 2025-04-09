import prisma from "@/lib/prisma";
import { CreateOrderItemInput } from "../orderItem";
import * as orderItemService from "../orderItem";

interface UpdateOrderItemInput {
  quantity: number;
  price: string;
  id: string;
}

interface UpdateOrderInput {
  orderDate: string;
  customerId: string;
  employeeId: string;
  totalAmount: number;
  orderId: string;
  orderItems: UpdateOrderItemInput[];
}

export const update = async ({
  orderDate,
  customerId,
  employeeId,
  totalAmount,
  orderItems,
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
        totalAmount,
      },
    });

    if (!updatedOrder) return;

    orderItemService.deleteAllByOrderId(orderId);

    orderItems.forEach(async i => {
      const createdOrderItem = orderItemService.create(
        Object.assign(i, { orderId })
      );
    });

    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};
