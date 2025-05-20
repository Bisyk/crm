import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  const { shop } = await getUser();

  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        shopId: shop.id,
      },
    });

    return campaigns;
  } catch (error) {
    console.log("Failed to get campaigns");
    console.error(error);
    throw new Error("Failed to get campaigns");
  }
};
