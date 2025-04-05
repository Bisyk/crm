import { createTRPCRouter } from "../init";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";
import { shopRouter } from "./shopRouter";
import { customerRouter } from "./customerRouter";
import { employeeRouter } from "./employeeRouter";
import { categoryRouter } from "./categoryRouter";
import { brandRouter } from "./brandRouter";
import { productRouter } from "./productRouter";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  shop: shopRouter,
  customer: customerRouter,
  employee: employeeRouter,
  product: productRouter,
  category: categoryRouter,
  brand: brandRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
