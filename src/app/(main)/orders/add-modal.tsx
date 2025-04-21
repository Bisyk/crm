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
import ProductsList from "@/components/products-list";
import { OrderItem } from "@/types/shared";
import { useForm } from "@/hooks/use-form";

interface AddModalProps {
  id?: string;
  children: React.ReactNode;
}

const PAYMENT_STATUSES = [
  "pending",
  "processing",
  "paid",
  "failed",
  "refunded",
  "cancelled",
];

const DELIVERY_STATUSES = [
  "processing",
  "packed",
  "shipped",
  "in_transit",
  "delivered",
  "returned",
  "cancelled",
];

const INITIAL_FORM_VALUE = {
  orderDate: "",
  customerId: "",
  employeeId: "",
  paymentStatus: "pending",
  deliveryStatus: "processing",
};

export default function AddModal({ id, children }: AddModalProps) {
  const { form, resetForm, updateFormField } = useForm(INITIAL_FORM_VALUE);
  const [selectedProductId, setSelectedProductId] = useState<string | "">("");
  const [addedProducts, setAddedProducts] = useState<
    {
      productId: string;
      name: string;
      price: string;
      quantity: number;
    }[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const { data: customers } = trpc.customer.getAll.useQuery();
  const { data: employees } = trpc.employee.getAll.useQuery();
  const { data: products } = trpc.product.getAll.useQuery();

  const utils = trpc.useUtils();

  const { data: order } = trpc.order.getById.useQuery(id!, {
    enabled: !!id,
  });

  const { data: orderItems } = trpc.orderItem.getAllByOrderId.useQuery(id!, {
    enabled: !!id,
  });

  useEffect(() => {
    if (order && orderItems) {
      const dateObj = new Date(order.orderDate);
      const formattedDate = dateObj.toISOString().split("T")[0];

      updateFormField("orderDate", formattedDate);
      updateFormField("customerId", order.customerId);
      updateFormField("employeeId", order.employeeId);
      updateFormField("paymentStatus", order.paymentStatus);
      updateFormField("deliveryStatus", order.deliveryStatus);

      setAddedProducts(orderItems);
    }
  }, [order]);

  const mutation = trpc.order.create.useMutation({
    onSuccess: () => {
      resetForm();
      setAddedProducts([]);

      toast.success("Product added successfully");

      utils.order.getAll.invalidate();
    },
    onError: error => {
      console.log(error);
      toast.error(
        "Ooooops! Something went wrong. Product not added. Please check your inputs and try again."
      );
    },
  });

  const updateMutation = trpc.order.update.useMutation({
    onSuccess: () => {
      toast.success("Product added successfully");

      utils.order.getAll.invalidate();
    },
    onError: error => {
      console.log(error);
      toast.error(
        "Ooooops! Something went wrong. Product not edited. Please check your inputs and try again."
      );
    },
  });

  const handleAddProduct = () => {
    if (selectedProductId && quantity) {
      const product = products?.find(
        (p: OrderItem) => p.id === selectedProductId
      );

      const isProductAlreadyAdded = addedProducts.some(
        p => p.productId === selectedProductId
      );

      if (isProductAlreadyAdded) {
        setAddedProducts(prev => {
          return prev.map(p =>
            p.productId === selectedProductId
              ? { ...p, quantity: p.quantity + Number(quantity) }
              : p
          );
        });

        setSelectedProductId("");
        setQuantity(1);

        return;
      }

      if (product) {
        setAddedProducts(prev => [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: Number(quantity),
          },
        ]);
        setSelectedProductId("");
        setQuantity(1);
      }
    }
  };

  const handleDeleteProduct = (id: string) => {
    setAddedProducts(prev => prev.filter(p => p.productId !== id));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      ...form,
      orderItems: addedProducts,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      updateMutation.mutate({
        ...form,
        orderItems: addedProducts,
        orderId: id,
      });
    }
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-start items center">
        <DialogTrigger asChild>
          <Button variant="outline">{children}</Button>
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
              value={form.orderDate}
              onChange={e => updateFormField("orderDate", e.target.value)}
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
              onValueChange={value => updateFormField("customerId", value)}
              value={form.customerId}
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
              onValueChange={value => updateFormField("employeeId", value)}
              value={form.employeeId}
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
              htmlFor="payment-status"
              className="text-right"
            >
              Payment Status
            </Label>
            <Select
              onValueChange={value => updateFormField("paymentStatus", value)}
              value={form.paymentStatus}
            >
              <SelectTrigger className="w-[180px] md:w-[410px] lg:w-[555px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_STATUSES.map((s: string) => (
                  <SelectItem
                    key={s}
                    value={s}
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="delivery-status"
              className="text-right"
            >
              Delivery Status
            </Label>
            <Select
              onValueChange={value => updateFormField("deliveryStatus", value)}
              value={form.deliveryStatus}
            >
              <SelectTrigger className="w-[180px] md:w-[410px] lg:w-[555px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {DELIVERY_STATUSES.map((s: string) => (
                  <SelectItem
                    key={s}
                    value={s}
                  >
                    {s}
                  </SelectItem>
                ))}
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
                onChange={e => setQuantity(Number(e.target.value))}
                value={quantity}
                id="product-quantity"
                placeholder="Quantity"
                className="max-w-20 md:max-w-24 lg:max-w-28"
                type="text"
                min={1}
              />
              <Button onClick={handleAddProduct}>+</Button>
            </div>
          </div>
          {addedProducts.length > 0 && (
            <ProductsList
              products={addedProducts}
              handleDeleteProduct={handleDeleteProduct}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={
                id
                  ? e => {
                      handleUpdate(e);
                    }
                  : e => {
                      handleCreate(e);
                    }
              }
            >
              {id ? "Edit Order" : "Add Order"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
