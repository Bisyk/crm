import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as authService from "../services/auth";
import { signupSchema } from "@/schemas/signup.schema";
import { loginSchema } from "@/schemas/login.schema";

export const authRouter = createTRPCRouter({
  signup: baseProcedure.input(signupSchema).mutation(async opts => {
    const res = await authService.signup(opts.input);
    if (!res.success) {
      return { success: false, error: res.error };
    }
    return { success: true };
  }),
  login: baseProcedure.input(loginSchema).mutation(async opts => {
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
