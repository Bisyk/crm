import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsTab from "./products-tab/products-tab";
import CategoriesTab from "./categories-tab/categories-tab";
import BrandsTab from "./brands-tab/brands-tab";

export default function ProductsPage() {
  return (
    <div className="container mx-auto">
      <Tabs
        defaultValue="products"
        className="w-full px-2"
      >
        <TabsList className="w-full">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesTab />
        </TabsContent>
        <TabsContent value="brands">
          <BrandsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
