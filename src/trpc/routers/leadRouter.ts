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
            price: z.string(),
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
      leadService.updateStage(input.id, input.stage);
    }),
  getTotalNumber: baseProcedure.query(async () => {
    const total = leadService.getTotalNumber();
    return total;
  }),
  getById: baseProcedure.input(z.string()).query(async ({ input }) => {
    const lead = await leadService.getById(input);
    if (!lead) {
      throw new Error("Failed to fetch lead by ID");
    }
    return lead;
  }),
  update: baseProcedure
    .input(
      z.object({
        id: z.string(),
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
      const lead = await leadService.update(input.id, input);
      if (!lead) {
        throw new Error("Failed to update lead");
      }
      return lead;
    }),
  delete: baseProcedure.input(z.string()).mutation(async ({ input }) => {
    const lead = await leadService.deleteLead(input);
    if (!lead) {
      throw new Error("Failed to delete lead");
    }
    return lead;
  }),
  convertToCustomer: baseProcedure
    .input(z.object({ leadId: z.string(), employeeId: z.string() }))
    .mutation(async ({ input }) => {
      const customer = await leadService.convertToCustomer(
        input.leadId,
        input.employeeId
      );
      if (!customer) {
        throw new Error("Failed to convert lead to customer");
      }
      return customer;
    }),
});
