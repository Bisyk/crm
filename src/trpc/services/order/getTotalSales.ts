import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getTotalSales = async () => {
  const { shop } = await getUser();
  const orderCount = await prisma.order.count({
    where: {
      shopId: shop.id,
      deliveryStatus: {
        not: {
          in: ["returned", "cancelled"],
        },
      },
      paymentStatus: {
        not: {
          in: ["failed", "refunded", "cancelled"],
        },
      },
    },
  });

  return orderCount || 0;
};
