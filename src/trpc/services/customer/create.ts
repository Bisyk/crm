import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export const create = async ({
  firstName,
  lastName,
  email,
  phone,
  address,
}: CreateCustomerInput) => {
  try {
    const { chosenShopId: shopId } = await getUser();

    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        shopId,
      },
    });

    return customer;
  } catch (error) {
    console.log("Failed to create customer");
    console.error(error);
    throw new Error("Failed to create customer");
  }
};
