import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export const signup = async ({
  email,
  password,
  firstName,
  lastName,
  shopName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  shopName: string;
}) => {
  const salt = randomBytes(8).toString("hex");

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  const result = salt + "." + hash.toString("hex");

  try {
    const resultData = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          email,
          password: result,
          firstName,
          lastName,
          type: "admin",
        },
      });

      const shop = await tx.shop.create({
        data: {
          name: shopName,
          ownerId: user.id,
        },
      });

      const employee = await tx.employee.create({
        data: {
          firstName,
          lastName,
          email,
          shopId: shop.id,
          position: "admin",
          salary: 0,
          hireDate: new Date(),
        },
      });

      await createSession(user.id);

      return { user };
    });

    return {
      success: true,
      userId: resultData.user.id,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: new Error("Failed to create user"),
    };
  }
};
