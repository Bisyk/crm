import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { OrderItem } from "@/types/shared";

export const convertToCustomer = async (leadId: string, employeeId: string) => {
  const { shop } = await getUser();

  return prisma.$transaction(async (tx: any) => {
    const lead = await tx.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    if (lead.shopId !== shop.id) {
      throw new Error("You do not have permission to access this lead");
    }

    const leadInterests = await tx.leadInterest.findMany({
      where: { leadId: lead.id },
    });

    const customer = await tx.customer.create({
      data: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone,
        shopId: lead.shopId,
      },
    });

    if (leadInterests.length > 0) {
      const order = await tx.order.create({
        data: {
          orderDate: new Date(),
          customerId: customer.id,
          shopId: lead.shopId,
          deliveryStatus: "pending",
          paymentStatus: "pending",
          employeeId: employeeId,
        },
      });

      const orderItems = await tx.orderItem.createMany({
        data: leadInterests.map((interest: OrderItem) => {
          return {
            orderId: order.id,
            productId: interest.productId,
            quantity: interest.quantity,
            price: interest.price,
          };
        }),
      });

      await tx.leadInterest.deleteMany({
        where: { leadId: lead.id },
      });
    }

    if (!customer) {
      throw new Error("Failed to create customer");
    }

    const updatedLead = await tx.lead.update({
      where: { id: leadId },
      data: {
        stage: "Converted",
      },
    });

    return customer;
  });
};
