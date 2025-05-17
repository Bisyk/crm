import prisma from "@/lib/prisma";

export const getAllByOrderId = (orderId: string) => {
  try {
    const orderItems = prisma.orderItem.findMany({
      where: {
        orderId,
      },
      select: {
        id: true,
        productId: true,
        quantity: true,
        price: true,
        product: {
          select: { name: true },
        },
      },
    });

    return orderItems.then(items =>
      items.map(item => ({
        ...item,
        name: item.product.name,
        product: undefined,
      }))
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find order items by order id");
  }
};
