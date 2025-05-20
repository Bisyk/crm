import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";

export const getSmtpFrom = async () => {
  const { shop } = await getUser();

  try {
    const settings = await prisma.shopSmtpSettings.findUnique({
      where: {
        shopId: shop.id,
      },
      select: {
        smtpFrom: true,
        smtpUser: true,
      },
    });

    return `"${settings.smtpFrom}" <${settings.smtpUser}>`;
  } catch (error) {
    console.error("Failed to get SMTP settings");
    throw new Error("Failed to get SMTP settings");
  }
};
