import { ProductCard } from "@/components/product-card";
import { trpc } from "@/trpc/client";

export default function ProductsGrid() {
  const { data: products } = trpc.product.getAll.useQuery();

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-center lg:justify-start items-center mb-4">
      {products &&
        products.map(p => (
          <ProductCard
            id={p.id}
            key={p.id}
            name={p.name}
            description={p.description}
            price={p.price}
            stockCount={p.stockCount}
            imageUrl={p.imageUrl}
            lowStockThreshold={p.lowStockThreshold}
          />
        ))}
    </div>
  );
}
