import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        leadInterests: {
          select: {
            quantity: true,
            productId: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    console.log(lead, "lead");

    return lead;
  } catch (error) {
    console.error("Error fetching lead by ID:", error);
    throw new Error("Failed to fetch lead data");
  }
};
