import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as orderService from "../services/order";

export const orderRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        orderDate: z.string(),
        customerId: z.string(),
        employeeId: z.string(),
        totalAmount: z.number(),
      })
    )
    .mutation(async opts => {
      const order = await orderService.create(opts.input);

      if (!order) {
        throw new Error("Failed to create order");
      }
      return order;
    }),
  getAll: baseProcedure.query(async () => {
    const orders = await orderService.getAll();
    return orders;
  }),
});
