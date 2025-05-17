import prisma from "@/lib/prisma";

export const updateStage = async (id: string, stage: string) => {
  try {
    const updatedLead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        stage,
      },
    });

    return updatedLead;
  } catch (error) {
    throw new Error("Failed to update lead");
  }
};
