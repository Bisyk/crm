import { deleteSession } from "@/lib/session";

export const logout = async () => {
  await deleteSession();
};
