import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    return campaign;
  } catch (error) {
    console.log("Failed to get campaign");
    console.error(error);
    throw new Error("Failed to get campaign");
  }
};
