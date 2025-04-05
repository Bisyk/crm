import { getUser } from "@/lib/dal";
import prisma from "@/lib/prisma";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  role: string;
  salary: number;
  hireDate: string;
  password: string;
}

export const create = async ({
  firstName,
  lastName,
  email,
  phone,
  position,
  role,
  salary,
  hireDate,
  password,
}: CreateEmployeeInput) => {
  const { shop } = await getUser();

  const isoTimeString = new Date(hireDate).toISOString();

  // Check if user registered
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const salt = randomBytes(8).toString("hex");

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + "." + hash.toString("hex");

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: result,
          name: `${firstName} ${lastName}`,
          type: "employee",
        },
      });
    } catch (error) {
      console.log("Failed to create user");
      console.error(error);
    }

    try {
      const employee = await prisma.employee.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          position,
          role,
          salary,
          shopId: shop.id,
          hireDate: isoTimeString,
          shops: {
            connect: [{ id: shop.id }],
          },
        },
      });

      return employee;
    } catch (error) {
      console.log("Failed to create employee");
      console.error(error);
      throw new Error("Failed to create employee");
    }
  }
};
