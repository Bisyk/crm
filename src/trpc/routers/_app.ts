import {  createTRPCRouter } from "../init";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";
import { shopRouter } from "./shopRouter";
import { customerRouter } from "./customerRouter";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  shop: shopRouter,
  customer: customerRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
