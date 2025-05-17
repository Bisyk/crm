import prisma from "@/lib/prisma";

export const updateEmployee = async (id: string, data: any) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });

    return updatedEmployee;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw new Error("Failed to update employee data");
  }
};
