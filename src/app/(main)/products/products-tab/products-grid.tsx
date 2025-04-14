import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/shared";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-center lg:justify-between items-center mb-4">
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
