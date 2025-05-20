import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/dal";
import { decrypt } from "@/utils/encryption/aes-256-gcm-encryption";

export const getUserTransporter = async () => {
  const { shop } = await getUser();

  const settings = await prisma.shopSmtpSettings.findUnique({
    where: { shopId: shop.id },
  });

  if (!settings) throw new Error("SMTP settings not found");

  const password = decrypt({
    encryptedData: settings.smtpPassword,
    iv: settings.iv,
    tag: settings.tag,
  });

  return nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpPort === 465,
    auth: {
      user: settings.smtpUser,
      pass: password,
    },
  });
};
