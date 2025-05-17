import prisma from "@/lib/prisma";

export const deleteAllByOrderId = async (orderId: string) => {
  try {
    await prisma.orderItem.deleteMany({
      where: {
        orderId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
