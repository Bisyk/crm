import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as authService from "../services/auth";

export const authRouter = createTRPCRouter({
  signup: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(3),
      })
    )
    .mutation(async opts => {
      const res = await authService.signup(opts.input);
      if (!res.success) {
        return { success: false, error: res.error };
      }
      return { success: true };
    }),
  login: baseProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async opts => {
      const res = await authService.login(opts.input);
      if (!res.success) {
        return { success: false, error: res.error };
      }
      return { success: true };
    }),
  logout: baseProcedure.mutation(async () => {
    await authService.logout();
  }),
});
