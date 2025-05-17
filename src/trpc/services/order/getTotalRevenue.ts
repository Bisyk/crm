import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getTotalRevenue = async () => {
  try {
    const { shop } = await getUser();

    const orders = await prisma.order.findMany({
      select: {
        id: true,
      },
      where: {
        shopId: shop.id,
        deliveryStatus: "delivered",
        paymentStatus: "paid",
      },
    });

    console.log(orders);

    const orderIds = orders.map((order: Record<string, string>) => order.id);

    console.log(orderIds);

    const totalPrice = await prisma.orderItem.aggregate({
      where: {
        orderId: {
          in: orderIds,
        },
      },
      _sum: {
        price: true,
      },
    });

    return totalPrice._sum.price || 0; 

    return orders;
  } catch (error) {
    throw new Error("Failed to get total num of leads");
  }
};
