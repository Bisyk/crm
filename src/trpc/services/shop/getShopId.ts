import { getUser } from "@/lib/dal";

export const getShopId = async () => {
  const { shop } = await getUser();
  if (!shop || !shop.id) {
    throw new Error("Shop not found or not associated with the user.");
  }
  return shop.id;
};
