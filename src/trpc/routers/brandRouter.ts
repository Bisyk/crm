import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as brandService from "../services/brand";

export const brandRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async opts => {
      const brand = brandService.create(opts.input);

      if (!brand) {
        throw new Error("Failed to create brand");
      }
      return brand;
    }),
  getAll: baseProcedure.query(async () => {
    const brand = await brandService.getAll();
    return brand;
  }),
});
