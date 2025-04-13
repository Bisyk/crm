import prisma from "@/lib/prisma";

export const update = async (id: string, stage: string) => {
  try {
    await prisma.lead.update({
      where: {
        id,
      },
      data: {
        stage,
      },
    });
  } catch (error) {
    throw new Error("Failed to update lead");
  }
};
