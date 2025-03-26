// trpc/routers/userRouter.ts
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as userService from "../services/user";

export const userRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const users = await userService.getAll();
    return users;
  }),
  getUser: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async opts => {
      // Here you would fetch the user from a database or other data source
      const user = { id: opts.input.id, name: "John Doe" }; // Example data
      return user;
    }),

  updateUser: baseProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async opts => {
      // Here you would update the user data in the database
      const updatedUser = { id: opts.input.id, name: opts.input.name }; // Example update
      return updatedUser;
    }),
});
