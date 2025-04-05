import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export const signup = async ({
  email,
  password,
  name,
  shopName,
}: {
  email: string;
  password: string;
  name: string;
  shopName: string;
}) => {
  const salt = randomBytes(8).toString("hex");

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  const result = salt + "." + hash.toString("hex");

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: result,
        name,
        type: 'admin',
      },
    });

    const shop = await prisma.shop.create({
      data: {
        name: shopName,
        ownerId: user.id,
      },
    });

    await createSession(user.id);

    return {
      success: true,
      userId: user.id,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: new Error("Failed to create user"),
    };
  }
};
