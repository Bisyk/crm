import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as orderItemService from "../services/orderItem";

export const orderItemRouter = createTRPCRouter({
  getAllByOrderId: baseProcedure.input(z.string()).query(async opts => {
    const orderItem = await orderItemService.getAllByOrderId(opts.input);
    return orderItem;
  }),
});
