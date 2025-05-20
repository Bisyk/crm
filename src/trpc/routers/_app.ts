import { createTRPCRouter } from "../init";
import { userRouter } from "./userRouter";
import { authRouter } from "./authRouter";
import { shopRouter } from "./shopRouter";
import { customerRouter } from "./customerRouter";
import { employeeRouter } from "./employeeRouter";
import { categoryRouter } from "./categoryRouter";
import { brandRouter } from "./brandRouter";
import { productRouter } from "./productRouter";
import { orderRouter } from "./orderRouter";
import { orderItemRouter } from "./orderItemRouter";
import { leadRouter } from "./leadRouter";
import { statisticsRouter } from "./statisticsRouter";
import { campaignRouter } from "./campaignRouter";
import { smtpRouter } from "./smtpRouter";
import { mailRouter } from "./mailRouter";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  shop: shopRouter,
  customer: customerRouter,
  employee: employeeRouter,
  product: productRouter,
  category: categoryRouter,
  brand: brandRouter,
  order: orderRouter,
  orderItem: orderItemRouter,
  lead: leadRouter,
  statistics: statisticsRouter,
  campaign: campaignRouter,
  smtp: smtpRouter,
  mail: mailRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
