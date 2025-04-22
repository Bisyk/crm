import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    return customer;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw new Error("Failed to fetch customer data");
  }
};
