import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as leadService from "../services/lead";

export const leadRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const leads = await leadService.getAll();
    return leads;
  }),
  create: baseProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        notes: z.string(),
        stage: z.string(),
        employeeId: z.string(),
        interests: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const lead = await leadService.create(input);
    }),
  updateStage: baseProcedure
    .input(z.object({ id: z.string(), stage: z.string() }))
    .mutation(async ({ input }) => {
      leadService.update(input.id, input.stage);
    }),
});
