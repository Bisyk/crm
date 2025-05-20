import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as smtpService from "../services/smtp";

export const mailRouter = createTRPCRouter({
  sendToMultiple: baseProcedure
    .input(
      z.object({
        emails: z.array(z.string().email()),
        subject: z.string(),
        htmlTemplate: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await smtpService.sendEmail(input);
    }),
});
