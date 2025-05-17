"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, Table } from "lucide-react";
import { trpc } from "@/trpc/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import AddModal from "./add-modal";
import ProductsGrid from "./products-grid";
import Loader from "@/components/loader";

export default function ProductsTab() {
  const { data, error, isLoading } = trpc.product.getAll.useQuery();

  return (
    <div className="container mx-auto">
      <Tabs
        defaultValue="grid"
        className="w-full flex justify-end items-end"
      >
        <div className="flex gap-2">
          <AddModal>Add Product</AddModal>
          <TabsList className="">
            <TabsTrigger value="grid">
              <LayoutGrid />
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="grid"
          className="w-full"
        >
          {data && !error && <ProductsGrid products={data} />}
          {isLoading && <Loader />}
        </TabsContent>
        <TabsContent
          className="w-full"
          value="table"
        >
          <DataTable
            data={data}
            columns={columns}
            fieldToSortBy="name"
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
