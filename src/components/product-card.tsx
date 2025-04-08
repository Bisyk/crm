import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import NoImage from "../../public/no-image.webp";
import { BoxIcon } from "lucide-react";
import { Button } from "./ui/button";
import DeleteDialog from "@/app/(main)/products/products-tab/delete-dialog";
import AddModal from "@/app/(main)/products/products-tab/add-modal";

declare interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  imageUrl: string;
  lowStockThreshold: number;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  stockCount,
  imageUrl,
  lowStockThreshold,
}: ProductCardProps) {
  return (
    <Card className="w-[300px] min-h-[535px]">
      <CardHeader className="flex w-full items-center border-b-2 border-gray-200 pb-4">
        <div className="px-1 py-2 rounded bg-gray-200">
          <BoxIcon />
        </div>
        <CardTitle>
          {name?.length > 30 ? name.slice(0, 30) + "..." : name}
        </CardTitle>
        {stockCount >= lowStockThreshold && (
          <div className="bg-green-100 text-green-900 text-sm px-4 rounded border border-green-200">
            <p className="text-center">In Stock</p>
          </div>
        )}
        {stockCount < lowStockThreshold && stockCount > 0 && (
          <div className="bg-orange-100 text-orange-900 text-sm px-4 rounded border border-orange-200">
            <p className="text-center">Low Stocks</p>
          </div>
        )}
        {stockCount === 0 && (
          <div className="bg-red-100 text-red-900 text-sm px-4 rounded border border-red-200">
            <p className="text-center">Out of Stock</p>
          </div>
        )}
      </CardHeader>
      <CardContent className="border-b-2 border-gray-200 pb-2 flex-1">
        <div className="flex justify-center border border-black/10 rounded-lg p-2">
          <Image
            draggable={false}
            src={imageUrl || NoImage}
            alt="Product Image"
            height={150}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col min-h-[155px]">
          <div className="flex-1">
            <p className="text-sm mt-2 text-gray-600">
              {description?.length > 50
                ? description.slice(0, 140) + "..."
                : description}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-gray-600 text-md ">Price</span>
              <span className="text-lg font-semibold">{price}$</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600 text-md ">Inventory</span>
              <span className="text-lg font-semibold">{stockCount} units</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center gap-2">
        <AddModal id={id}>Edit</AddModal>
        <DeleteDialog id={id}>Delete</DeleteDialog>
      </CardFooter>
    </Card>
  );
}
