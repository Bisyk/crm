"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export default function AddModal() {
  const [orderDate, setOrderDate] = useState("");
  const [customerId, setCustomerId] = useState<string | "">("");
  const [employeeId, setEmployeeId] = useState<string | "">("");
  const [selectedProductId, setSelectedProductId] = useState<string | "">("");
  const [addedProducts, setAddedProducts] = useState<
    {
      id: string;
      name: string;
      price: string;
      quantity: number;
    }[]
  >([]);
  const [quantity, setQuantity] = useState("1");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      addedProducts.reduce((acc, p) => acc + Number(p.price) * p.quantity, 0)
    );
  }, [addedProducts]);

  const utils = trpc.useUtils();

  const { data: customers } = trpc.customer.getAll.useQuery();
  const { data: employees } = trpc.employee.getAll.useQuery();
  const { data: products } = trpc.product.getAll.useQuery();



  const mutation = trpc.order.create.useMutation({
    onSuccess: () => {
      setOrderDate("");
      setCustomerId("");
      setEmployeeId("");
      setAddedProducts([]);

      toast.success("Product added successfully");

      utils.order.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Product not added. Please check your inputs and try again."
      );
    },
  });

  const handleAddProduct = () => {
    if (selectedProductId && quantity) {
      const product = products?.find(p => p.id === selectedProductId);

      const isProductAlreadyAdded = addedProducts.some(
        p => p.id === selectedProductId
      );

      if (isProductAlreadyAdded) {
        setAddedProducts(prev => {
          return prev.map(p =>
            p.id === selectedProductId
              ? { ...p, quantity: p.quantity + Number(quantity) }
              : p
          );
        });

        setSelectedProductId("");
        setQuantity("1");

        return;
      }

      if (product) {
        setAddedProducts(prev => [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: Number(quantity),
          },
        ]);
        setSelectedProductId("");
        setQuantity("1");
      }
    }
  };

  const handleDeleteProduct = (id: string) => {
    setAddedProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      orderDate,
      customerId,
      employeeId,
      totalAmount,
    });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Order</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Order</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new order. Ensure all fields are
            completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="order-date"
              className="text-right"
            >
              Order Date
            </Label>
            <Input
              value={orderDate}
              onChange={e => setOrderDate(e.target.value)}
              id="order-date"
              placeholder="YYYY-MM-DD"
              type="date"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Customer
            </Label>
            <Select
              onValueChange={value => setCustomerId(value)}
              value={customerId}
            >
              <SelectTrigger className="w-[180px] md:w-[410px] lg:w-[555px]">
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                {customers?.map(
                  (c: { id: string; firstName: string; lastName: string }) => (
                    <SelectItem
                      key={c.id}
                      value={c.id}
                    >
                      {c.firstName} {c.lastName}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Employee
            </Label>
            <Select
              onValueChange={value => setEmployeeId(value)}
              value={employeeId}
            >
              <SelectTrigger className="w-[180px] md:w-[410px] lg:w-[555px]">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees?.map(
                  (e: { id: string; firstName: string; lastName: string }) => (
                    <SelectItem
                      key={e.id}
                      value={e.id}
                    >
                      {e.firstName} {e.lastName}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-category"
              className="text-right"
            >
              Product
            </Label>
            <div className="flex space-x-2 col-span-3">
              <Select
                onValueChange={value => setSelectedProductId(value)}
                value={selectedProductId}
              >
                <SelectTrigger className="w-[180px] md:w-[260px] lg:w-[400px]">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products?.map(
                    (p: { id: string; name: string; price: string }) => (
                      <SelectItem
                        key={p.id}
                        value={p.id}
                      >
                        <div className="flex">
                          <div>
                            {p.name} /{" "}
                            <span className="text-gray-500 text-xs">
                              ${p.price}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Input
                onChange={e => setQuantity(e.target.value)}
                value={quantity}
                id="product-quantity"
                placeholder="Quantity"
                className="max-w-20 md:max-w-24 lg:max-w-28"
                type="number"
              />
              <Button onClick={handleAddProduct}>+</Button>
            </div>
          </div>
          {addedProducts.length > 0 && (
            <Card className="p-4 mt-2">
              {addedProducts.map(p => (
                <div
                  key={p.id}
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
                  <Button onClick={() => handleDeleteProduct(p.id)}>
                    <Trash2 />
                  </Button>
                </div>
              ))}
              <div className="border"></div>
              <div className="flex justify-between items-center mt-2 px-2">
                <div>Total</div>
                <div className="text-lg">$ {totalAmount}</div>
              </div>
            </Card>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={e => {
                handleCreate(e);
              }}
            >
              Add Order
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
