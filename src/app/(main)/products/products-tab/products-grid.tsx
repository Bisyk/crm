import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/shared";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center md:justify-center lg:justify-start items-center mb-4">
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
      {!products.length && (
        <div className="flex flex-col items-center justify-center w-full h-full">
          No products available
        </div>
      )}
    </div>
  );
}
