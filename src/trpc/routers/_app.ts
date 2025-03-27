import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(opts => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  user: userRouter,
  auth: authRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
