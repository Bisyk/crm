interface UpdateCampaignData {
  name: string;
  description: string;
  template: string;
}
import prisma from "@/lib/prisma";

export const updateCampaign = async (id: string, data: UpdateCampaignData) => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id },
      data,
    });
    return campaign;
  } catch (error) {
    console.log("Failed to update campaign");
    console.error(error);
    throw new Error("Failed to update campaign");
  }
};
