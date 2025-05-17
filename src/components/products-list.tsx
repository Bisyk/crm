"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { OrderItem } from "@/types/shared";

interface ProductListProps {
  products: OrderItem[];
  handleDeleteProduct: (id: string) => void;
}

export default function ProductsList({
  products,
  handleDeleteProduct,
}: ProductListProps) {
  const [totalPrice, setTotalPrice] = useState(0);

  console.log(products);

  useEffect(() => {
    setTotalPrice(
      products.reduce((acc, p) => acc + Number(p.price) * p.quantity, 0)
    );
  }, [products]);

  return (
    <Card className="p-4 mt-2">
      {products.map(p => (
        <div
          key={p.productId}
          className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
        >
          <div>
            <div>{p.name}</div>
            <div className="text-sm text-gray-500">
              <span>${Number(p.price).toFixed(2)}</span> x{" "}
              <span>{p.quantity}</span> |{" "}
              {(Number(p.price) * p.quantity).toFixed(2)}
            </div>
          </div>
          <Button
            onClick={() => handleDeleteProduct(p.productId)}
            variant="ghost"
          >
            <Trash2 />
          </Button>
        </div>
      ))}
      <div className="border"></div>
      <div className="flex justify-between items-center mt-2 px-2">
        <div>Total</div>
        <div className="text-lg">$ {totalPrice}</div>
      </div>
    </Card>
  );
}
