import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
  }
};
