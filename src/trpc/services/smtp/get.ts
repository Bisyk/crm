import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { decrypt } from "@/utils/encryption/aes-256-gcm-encryption";

export const get = async () => {
  const { shop } = await getUser();

  try {
    const smtp = await prisma.shopSmtpSettings.findFirst({
      where: {
        shopId: shop.id,
      },
      select: {
        id: true,
        smtpHost: true,
        smtpPort: true,
        smtpUser: true,
        smtpPassword: true,
        smtpFrom: true,
        iv: true,
        tag: true,
      },
    });

    if (!smtp) {
      return null;
    }

    const password = decrypt({
      encryptedData: smtp.smtpPassword,
      iv: smtp.iv,
      tag: smtp.tag,
    });

    return {
      smtpHost: smtp.smtpHost,
      smtpPort: smtp.smtpPort,
      smtpUser: smtp.smtpUser,
      smtpPassword: password,
      smtpFrom: smtp.smtpFrom,
    };
  } catch (error) {
    console.error("Failed to get SMTP settings");
    throw new Error("Failed to get SMTP settings");
  }
};
