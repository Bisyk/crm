import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getSalesByMonths = async () => {
  const { shop } = await getUser();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const sales = await prisma.order.findMany({
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
      orderDate: {
        gte: sixMonthsAgo,
      },
    },
  });

  return getLastSixMonthSales(sales);
};

function getLastSixMonthSales(
  sales: { orderDate: string | Date }[]
): { month: string; sales: number }[] {
  const now = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate last 6 months (from oldest to newest)
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`, // unique key like "2025-4"
      month: monthNames[date.getMonth()],
      sales: 0,
    };
  });

  // Count sales per month
  for (const sale of sales) {
    const date = new Date(sale.orderDate);
    const key = `${date.getFullYear()}-${date.getMonth()}`;

    const monthEntry = lastSixMonths.find(m => m.key === key);
    if (monthEntry) {
      monthEntry.sales++;
    }
  }

  // Remove the "key" before returning
  return lastSixMonths.map(({ key, ...rest }) => rest);
}
