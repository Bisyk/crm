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
        paymentStatus: z.string(),
        deliveryStatus: z.string(),
        orderItems: z.array(
          z.object({
            quantity: z.number(),
            price: z.string(),
            productId: z.string(),
          })
        ),
      })
    )
    .mutation(async opts => {
      try {
        const order = await orderService.create(opts.input);

        return order;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create order");
      }
    }),
  update: baseProcedure
    .input(
      z.object({
        orderDate: z.string(),
        customerId: z.string(),
        employeeId: z.string(),
        orderId: z.string(),
        paymentStatus: z.string(),
        deliveryStatus: z.string(),
        orderItems: z.array(
          z.object({
            quantity: z.number(),
            price: z.string(),
            productId: z.string(),
          })
        ),
      })
    )
    .mutation(async opts => {
      const updatedOrder = await orderService.update(opts.input);
    }),
  getAll: baseProcedure.query(async () => {
    const orders = await orderService.getAll();
    return orders;
  }),
  getById: baseProcedure.input(z.string()).query(async opts => {
    const order = await orderService.getById(opts.input);
    return order;
  }),
  getTotalRevenue: baseProcedure.query(async () => {
    const totalOrderPrice = await orderService.getTotalRevenue();

    return totalOrderPrice;
  }),
  getTotalSales: baseProcedure.query(async () => {
    const totalSales = await orderService.getTotalSales();

    return totalSales;
  }),
  delete: baseProcedure.input(z.string()).mutation(async opts => {
    const order = await orderService.deleteOrder(opts.input);

    if (!order) {
      throw new Error("Failed to delete order");
    }
    return order;
  }),
  getByMonths: baseProcedure.query(async () => {
    const salesByMonths = await orderService.getSalesByMonths();

    return salesByMonths;
  }),
  getByCategories: baseProcedure.query(async () => {
    const salesByCategories = await orderService.getSalesByCategories();

    return salesByCategories;
  }),
});
