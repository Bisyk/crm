import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";
import prisma from "./prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/signup");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const shopsIds = await prisma.shop.findMany({
      where: {
        ownerId: session.userId,
      },
      select: {
        id: true,
      },
    });

    const chosenShop = await prisma.shop.findFirst({
      where: {
        ownerId: session.userId,
      },
      select: {
        id: true,
      },
    });

    return {
      ...user,
      chosenShopId: chosenShop?.id,
      shopsIds,
    };
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
