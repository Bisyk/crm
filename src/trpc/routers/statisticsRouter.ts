import { baseProcedure, createTRPCRouter } from "../init";
import * as statisticsService from "../services/statistics";

export const statisticsRouter = createTRPCRouter({
  getClientsVsLeads: baseProcedure.query(async () => {
    return await statisticsService.clientsVsLeads();
  }),
});
