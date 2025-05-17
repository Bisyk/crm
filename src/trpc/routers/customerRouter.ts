import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as customerService from "../services/customer";

export const customerRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .mutation(async opts => {
      const customer = customerService.create(opts.input);

      if (!customer) {
        throw new Error("Failed to create customer");
      }
      return customer;
    }),
  getAll: baseProcedure.query(async () => {
    const customers = await customerService.getAll();
    return customers;
  }),
  getTotalNumber: baseProcedure.query(async () => {
    const total = await customerService.getTotalNumber();

    return total;
  }),
  getById: baseProcedure.input(z.string()).query(async opts => {
    const customer = await customerService.getById(opts.input);

    if (!customer) {
      throw new Error("Failed to fetch customer by ID");
    }
    return customer;
  }),
  update: baseProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .mutation(async opts => {
      const customer = await customerService.update(opts.input.id, opts.input);

      if (!customer) {
        throw new Error("Failed to update customer");
      }
      return customer;
    }),
  delete: baseProcedure.input(z.string()).mutation(async opts => {
    const customer = await customerService.deleteCustomer(opts.input);

    if (!customer) {
      throw new Error("Failed to delete customer");
    }
    return customer;
  }),
});
