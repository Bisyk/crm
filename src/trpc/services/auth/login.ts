import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return {
      success: false,
      error: new Error("User not found"),
    };
  }

  const [salt, storedHash] = user.password.split(".");

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  if (storedHash !== hash.toString("hex")) {
    return {
      success: false,
      error: new Error("Invalid password"),
    };
  }

  await createSession(user.id)

  return {
    success: true,
    userId: user.id,
  };
};
