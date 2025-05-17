import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getSalesByCategories = async () => {
  const { shop } = await getUser();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const orders = await prisma.order.findMany({
    where: {
      shopId: shop.id,
      deliveryStatus: {
        notIn: ["returned", "cancelled"],
      },
      paymentStatus: {
        notIn: ["failed", "refunded", "cancelled"],
      },
      orderDate: {
        gte: sixMonthsAgo,
      },
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return getTopCategories(orders);
};

function getTopCategories(
  orders: {
    items: { quantity: number; product: { category: { name: string } } }[];
  }[]
) {
  const categorySalesMap = new Map();

  for (const order of orders) {
    for (const item of order.items) {
      const category = item.product.category;
      if (!category) continue; // In case of missing relation

      const key = category.name;
      const current = categorySalesMap.get(key) || 0;
      categorySalesMap.set(key, current + item.quantity);
    }
  }

  const topCategories = [...categorySalesMap.entries()]
    .sort((a, b) => b[1] - a[1]) // Descending sort by quantity sold
    .slice(0, 5) // Top 5
    .map(([category, sales], i) => ({
      category,
      sales,
      fill: `var(--color-${i + 1})`,
    }));

  return topCategories;
}
