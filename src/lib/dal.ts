import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";
import prisma from "./prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  try {
    const session = await decrypt(cookie);

    if (!session?.userId) {
      redirect("/signup");
    }

    return { isAuth: true, userId: session.userId };
  } catch (error) {}
});

export const getUser = cache(async () => {
  const session = await verifySession();
  console.log("getUser session: ", session);

  if (!session) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
      },
    });

    console.log("user: ", user);

    let shop;

    if (user.type === "admin") {
      try {
        shop = await prisma.shop.findFirst({
          where: {
            ownerId: user.id,
          },
        });
      } catch (error) {
        console.log("Failed to fetch shop for admin user");
        console.error(error);
      }
    }

    if (user.type === "employee") {
      try {
        const employee = await prisma.employee.findFirst({
          where: {
            email: user.email,
          },
        });

        shop = await prisma.shop.findFirst({
          where: {
            employees: {
              some: {
                id: employee.id,
              },
            },
          },
        });
      } catch (error) {
        console.log("Failed to fetch shop for employee user");
        console.error(error);
      }
    }

    console.log("shop: ", shop);

    return {
      ...user,
      shop: {
        id: shop?.id,
        name: shop?.name,
      },
    };
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
