import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { getByUserId } from "../services/shop/getByUserId";

export const shopRouter = createTRPCRouter({
  getByUserId: baseProcedure.input(z.string()).query(async opts => {
    const shops = await getByUserId(opts.input);
    return shops;
  }),
});
