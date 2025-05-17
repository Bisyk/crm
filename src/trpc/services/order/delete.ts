import prisma from "@/lib/prisma";

export const deleteOrder = async (id: string) => {
  try {
    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    return deletedOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order data");
  }
};
