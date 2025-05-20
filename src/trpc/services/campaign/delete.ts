import prisma from "@/lib/prisma";

export const deleteCampaign = async (id: string) => {
  try {
    const campaign = await prisma.campaign.delete({
      where: { id },
    });
    return campaign;
  } catch (error) {
    console.log("Failed to delete campaign");
    console.error(error);
    throw new Error("Failed to delete campaign");
  }
};
