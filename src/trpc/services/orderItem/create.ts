import prisma from "@/lib/prisma";

export interface CreateOrderItemInput {
  quantity: number;
  price: string;
  id: string;
  orderId: string
}

export const create = async ({ quantity, price, id, orderId }: CreateOrderItemInput) => {
  try {
    const orderItem = await prisma.orderItem.create({
      data: {
        quantity,
        price,
        productId: id,
        orderId
      },
    });

    return orderItem;
  } catch (error) {
    console.error(error);
  }
};
