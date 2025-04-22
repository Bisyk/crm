import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getAll = async () => {
  try {
    const { shop } = await getUser();

    const leads = prisma.lead.findMany({
      where: {
        shopId: shop.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        notes: true,
        stage: true,
        createdAt: true,
        updatedAt: true,
        leadInterests: {
          select: {
            quantity: true,
            productId: true,
            product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    return leads;
  } catch (error) {
    console.log("Failed to fetch lead");
    return null;
  }
};
