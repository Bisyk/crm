import prisma from "@/lib/prisma";

export const update = async (id: string, data: any) => {
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data,
    });

    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer data");
  }
};
