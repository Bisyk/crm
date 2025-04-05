import prisma from "@/lib/prisma";

export const deleteById = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product. Please try again later.");
  }
};
