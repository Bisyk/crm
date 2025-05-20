import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

interface CreateCampaignInput {
  name: string;
  description: string;
  template: string;
}

export const create = async ({
  name,
  description,
  template,
}: CreateCampaignInput) => {
  const { shop } = await getUser();

  try {
    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        template,
        shopId: shop.id,
      },
    });

    return campaign;
  } catch (error) {
    console.log("Failed to create campaign");
    console.error(error);
    throw new Error("Failed to create campaign");
  }
};
