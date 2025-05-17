import prisma from "@/lib/prisma";

export interface CreateOrderItemInput {
  quantity: number;
  price: string;
  productId: string;
  orderId: string;
}

export const create = async ({
  quantity,
  price,
  productId,
  orderId,
}: CreateOrderItemInput) => {
  try {
    const orderItem = await prisma.orderItem.create({
      data: {
        quantity,
        price,
        productId,
        orderId,
      },
    });

    return orderItem;
  } catch (error) {
    console.error(error);
  }
};
