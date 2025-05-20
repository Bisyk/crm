import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { encrypt } from "@/utils/encryption/aes-256-gcm-encryption";

interface SmtpCreateInput {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  smtpFrom: string;
}

export const updateSmtp = async (data: SmtpCreateInput) => {
  try {
    const { smtpHost, smtpPort, smtpUser, smtpPassword, smtpFrom } = data;
    const { shop } = await getUser();

    const { iv, tag, encryptedData } = encrypt(smtpPassword);

    const smtp = await prisma.shopSmtpSettings.upsert({
      where: {
        shopId: shop.id,
      },
      update: {
        smtpHost,
        smtpPort,
        smtpUser,
        smtpFrom,
        smtpPassword: encryptedData,
        iv,
        tag,
      },
      create: {
        shopId: shop.id,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpFrom,
        smtpPassword: encryptedData,
        iv,
        tag,
      },
    });

    return smtp.id;
  } catch (error) {
    console.log("Failed to create SMTP");
    console.error(error);
    throw new Error("Failed to create SMTP");
  }
};
