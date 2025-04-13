import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

interface Interest {
  productId: string;
  quantity: number;
}

interface CreateLeadInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  stage: string;
  employeeId: string;
  interests: Interest[];
}

export const create = async ({
  firstName,
  lastName,
  email,
  phone,
  notes,
  stage,
  employeeId,
  interests,
}: CreateLeadInput) => {
  const {shop} = await getUser()

  try {
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        notes,
        stage,
        employeeId,
        shopId: shop.id,
      },
    });

    const leadInterests = await prisma.leadInterest.createMany({
      data: interests.map(interest => ({
        leadId: lead.id,
        productId: interest.productId,
        quantity: interest.quantity,
      })),
    });

    return { lead, leadInterests };
  } catch (error) {
    console.log("Failed to create lead", error);
    throw new Error("Failed to create lead");
  }
};
