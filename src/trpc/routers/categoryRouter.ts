import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as categoryService from "../services/category";

export const categoryRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async opts => {;
      const category = categoryService.create(opts.input);

      if (!category) {
        throw new Error("Failed to create category");
      }
      return category;
    }),
  getAll: baseProcedure.query(async () => {
    const category = await categoryService.getAll();
    return category;
  }),
});
