import prisma from "@/lib/prisma";

export const deleteEmployee = async (id: string) => {
  try {
    const employeeToDeleteEmail = await prisma.employee.findUnique({
      where: { id },
      select: { email: true },
    });

    await prisma.user.delete({
      where: { email: employeeToDeleteEmail.email },
    });

    const deletedEmployee = await prisma.employee.delete({
      where: { id },
    });

    return deletedEmployee;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error("Failed to delete employee data");
  }
};
