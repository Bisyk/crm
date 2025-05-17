import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const clientsVsLeads = async () => {
  const { shop } = await getUser();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const leads = await prisma.lead.findMany({
    where: {
      shopId: shop.id,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
  });

  const customers = await prisma.customer.findMany({
    where: {
      shopId: shop.id,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
  });

  console.log(convertToChartData(leads, customers));

  return convertToChartData(leads, customers);
};

// Helper function to convert arrays of objects into chart data format
function convertToChartData(
  leads: { createdAt: string }[],
  clients: { createdAt: string }[]
): { month: string; leads: number; clients: number }[] {
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

  const now = new Date();
  const dataMap = new Map<string, { leads: number; clients: number }>();

  // Step 1: Prepopulate last 6 months with 0 values
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    dataMap.set(key, { leads: 0, clients: 0 });
  }

  // Step 2: Count leads and clients into the map
  const countByMonth = (
    items: { createdAt: string }[],
    type: "leads" | "clients"
  ) => {
    for (const item of items) {
      const date = new Date(item.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (dataMap.has(key)) {
        dataMap.get(key)![type]++;
      }
    }
  };

  countByMonth(leads, "leads");
  countByMonth(clients, "clients");

  // Step 3: Convert map to array and format month names
  const sortedKeys = Array.from(dataMap.keys()).sort((a, b) => {
    const [aYear, aMonth] = a.split("-").map(Number);
    const [bYear, bMonth] = b.split("-").map(Number);
    return (
      new Date(aYear, aMonth).getTime() - new Date(bYear, bMonth).getTime()
    );
  });

  return sortedKeys.map(key => {
    const [, monthIndex] = key.split("-").map(Number);
    const { leads, clients } = dataMap.get(key)!;
    return {
      month: monthNames[monthIndex],
      leads,
      clients,
    };
  });
}
