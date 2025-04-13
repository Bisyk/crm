import prisma from "@/lib/prisma";

export const createMany = async (orderItemsInput: any) => {
  try {
    const orderItems = await prisma.orderItem.createMany({
      data: orderItemsInput.map((item: any) => ({
        ...item,
        orderId: orderItemsInput.orderId,
      })),
    });

    return orderItems;
  } catch (error) {
    console.error("Error creating order items:", error);
    throw new Error("Failed to create order items");
  }
};
