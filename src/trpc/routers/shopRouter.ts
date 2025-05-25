import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as shopService from "../services/shop";

export const shopRouter = createTRPCRouter({
  getByUserId: baseProcedure.input(z.string()).query(async opts => {
    const shops = await shopService.getByUserId(opts.input);
    return shops;
  }),
  getShopId: baseProcedure.query(async () => {
    const shopId = await shopService.getShopId();
    return shopId;
  }),
});
