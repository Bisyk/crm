import prisma from "@/lib/prisma";

export const getById = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    return employee;
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    throw new Error("Failed to fetch employee data");
  }
};
