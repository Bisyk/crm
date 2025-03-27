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
});
