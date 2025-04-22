import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as employeeService from "../services/employee";

export const employeeRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const employees = await employeeService.getAll();
    return employees;
  }),
  create: baseProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        position: z.string(),
        role: z.string(),
        salary: z.number(),
        hireDate: z.string(),
        password: z.string(),
      })
    )
    .mutation(async opts => {
      const employee = employeeService.create(opts.input);

      if (!employee) {
        throw new Error("Failed to create customer");
      }
      return employee;
    }),
  getById: baseProcedure.input(z.string()).query(async opts => {
    const employee = await employeeService.getById(opts.input);

    if (!employee) {
      throw new Error("Failed to fetch employee by ID");
    }
    return employee;
  }),
  update: baseProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        position: z.string(),
        role: z.string(),
        salary: z.number(),
        hireDate: z.string(),
      })
    )
    .mutation(async opts => {
      const employee = await employeeService.updateEmployee(
        opts.input.id,
        opts.input
      );

      if (!employee) {
        throw new Error("Failed to update employee");
      }
      return employee;
    }),
  delete: baseProcedure.input(z.string()).mutation(async opts => {
    const employee = await employeeService.deleteEmployee(opts.input);

    if (!employee) {
      throw new Error("Failed to delete employee");
    }
    return employee;
  }),
});
