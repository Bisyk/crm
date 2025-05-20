import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as smtpService from "../services/smtp";

export const smtpRouter = createTRPCRouter({
  get: baseProcedure.query(async () => {
    return await smtpService.get();
  }),
  updateSmtp: baseProcedure
    .input(
      z.object({
        smtpHost: z.string(),
        smtpPort: z.coerce.number(),
        smtpUser: z.string(),
        smtpPassword: z.string(),
        smtpFrom: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await smtpService.updateSmtp(input);
    }),
});
