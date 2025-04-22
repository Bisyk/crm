import prisma from "@/lib/prisma";

export const deleteLead = async (id: string) => {
  try {
    const deletedLead = await prisma.lead.delete({
      where: { id },
    });

    return deletedLead;
  } catch (error) {
    console.error("Error deleting lead:", error);
    throw new Error("Failed to delete lead data");
  }
};
