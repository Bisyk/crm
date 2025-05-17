import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getTotalNumber = async () => {
  try {
    const { shop } = await getUser();

    const totalLeads = await prisma.lead.count({
      where: {
        shopId: shop.id,
      },
    });

    return totalLeads;
  } catch (error) {
    throw new Error("Failed to get total num of leads");
  }
};
