import prisma from "@/lib/prisma";

export const deleteCustomer = async (id: string) => {
  try {
    const deletedCustomer = await prisma.customer.delete({
      where: { id },
    });

    return deletedCustomer;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer data");
  }
};
