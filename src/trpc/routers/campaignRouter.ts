import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as campaignService from "../services/campaign";

export const campaignRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    return await campaignService.getAll();
  }),
  getById: baseProcedure.input(z.string()).query(async opts => {
    const campaign = await campaignService.getById(opts.input);

    return campaign;
  }),
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        template: z.string(),
      })
    )
    .mutation(async opts => {
      const campaign = await campaignService.create(opts.input);

      if (!campaign) {
        throw new Error("Failed to create campaign");
      }
      return campaign;
    }),
  update: baseProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        template: z.string(),
      })
    )
    .mutation(async opts => {
      const campaign = await campaignService.updateCampaign(opts.input.id, {
        name: opts.input.name,
        description: opts.input.description,
        template: opts.input.template,
      });

      if (!campaign) {
        throw new Error("Failed to update campaign");
      }
      return campaign;
    }),
  delete: baseProcedure.input(z.string()).mutation(async opts => {
    const campaign = await campaignService.deleteCampaign(opts.input);

    return campaign;
  }),
});
