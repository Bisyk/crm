import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch order by ID");
  }
};
