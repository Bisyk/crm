import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import * as productService from "../services/product";

export const productRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        stockCount: z.number(),
        lowStockThreshold: z.number().optional(),
        brandId: z.string(),
        categoryId: z.string(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async opts => {
      const product = productService.create(opts.input);

      if (!product) {
        throw new Error("Failed to create product");
      }
      return product;
    }),
  getAll: baseProcedure.query(async () => {
    const product = await productService.getAll();
    return product;
  }),
  delete: baseProcedure.input(z.string()).mutation(async opts => {
    try {
      const product = await productService.deleteById(opts.input);
      return product;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product. Please try again later.");
    }
  }),
  update: baseProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string(),
          description: z.string(),
          price: z.number(),
          stockCount: z.number(),
          lowStockThreshold: z.number().optional(),
          brandId: z.string(),
          categoryId: z.string(),
          imageUrl: z.string().optional(),
        }),
      })
    )
    .mutation(async opts => {
      const { id, data } = opts.input;
      const product = await productService.update(id, data);

      if (!product) {
        throw new Error("Failed to update product");
      }

      return product;
    }),
  getById: baseProcedure.input(z.string()).query(async opts => {
    const product = await productService.getById(opts.input);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }),
  getAllByShopId: baseProcedure.input(z.string()).query(async opts => {
    const products = await productService.getAllByShopId(opts.input);
    return products;
  }),
});
