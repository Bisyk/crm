import prisma from "@/lib/prisma";

export const update = async (id: string, data: any) => {
  try {
    console.log(data, "data");

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        stage: data.stage,
        employeeId: data.employeeId,
      },
    });

    await prisma.leadInterest.deleteMany({
      where: { leadId: id },
    });

    const newLeadInterests = await prisma.leadInterest.createMany({
      data: data.interests.map((i: any) => ({
        leadId: id,
        productId: i.productId,
        quantity: i.quantity,
      })),
    });

    return updatedLead;
  } catch (error) {
    console.error("Error updating lead:", error);
    throw new Error("Failed to update lead data");
  }
};
