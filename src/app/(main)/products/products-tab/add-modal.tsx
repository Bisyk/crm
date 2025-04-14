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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { useForm } from "@/hooks/use-form";

interface AddModalProps {
  id?: string;
  children?: React.ReactNode;
}

const INITIAL_FORM_VALUE = {
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  brandId: "",
  imageUrl: "",
  lowStockThreshold: 1,
};

export default function AddModal({ id, children }: AddModalProps) {
  const { form, resetForm, updateFormField } = useForm(INITIAL_FORM_VALUE);

  const utils = trpc.useUtils();

  const mutation = trpc.product.create.useMutation({
    onSuccess: () => {
      resetForm();

      toast.success("Product added successfully");

      utils.product.getAll.invalidate();
    },
    onError: error => {
      toast.error(
        "Ooooops! Something went wrong. Product not added. Please check your inputs and try again."
      );
    },
  });

  const updateMutation = trpc.product.update.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully");

      utils.product.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Product not updated. Please check your inputs and try again."
      );
    },
  });

  const { data: categories } = trpc.category.getAll.useQuery();
  const { data: brands } = trpc.brand.getAll.useQuery();

  const { data } = trpc.product.getById.useQuery(id!, {
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      updateFormField("name", data.name);
      updateFormField("description", data.description);
      updateFormField("price", Number(data.price));
      updateFormField("quantity", Number(data.stockCount));
      updateFormField("categoryId", data.categoryId);
      updateFormField("brandId", data.brandId);
      updateFormField("imageUrl", data.image);
      updateFormField("lowStockThreshold", Number(data.lowStockThreshold));
    }
  }, [data]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ ...form, stockCount: form.quantity });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    updateMutation.mutate({ id, data: { ...form, stockCount: form.quantity } });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button variant="outline">{children}</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{id ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product. Ensure all fields
            are completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="product-name"
              className="text-right"
            >
              Name
            </Label>
            <Input
              value={form.name}
              onChange={e => updateFormField("name", e.target.value)}
              id="product-name"
              placeholder="MacBook Pro"
              type="text"
              required
              className="col-span-3"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-description"
            className="text-right"
          >
            Description
          </Label>
          <Input
            value={form.description}
            onChange={e => updateFormField("description", e.target.value)}
            id="product-description"
            placeholder="A high-performance laptop"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-price"
            className="text-right"
          >
            Price
          </Label>
          <Input
            value={form.price}
            onChange={e => updateFormField("price", Number(e.target.value))}
            id="product-price"
            placeholder="1999.99"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-quantity"
            className="text-right"
          >
            Quantity
          </Label>
          <Input
            value={form.quantity}
            onChange={e => updateFormField("quantity", Number(e.target.value))}
            id="product-quantity"
            placeholder="10"
            type="text"
            required
            className="col-span-3"
            min={1}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-category"
            className="text-right"
          >
            Category
          </Label>
          <Select
            onValueChange={value => updateFormField("categoryId", value)}
            value={form.categoryId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category: { id: string; name: string }) => (
          <SelectItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-brand"
            className="text-right"
          >
            Brand
          </Label>
          <Select
            onValueChange={value => updateFormField("brandId", value)}
            value={form.brandId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands?.map((brand: { id: string; name: string }) => (
          <SelectItem
            key={brand.id}
            value={brand.id}
          >
            {brand.name}
          </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-image"
            className="text-right"
          >
            Image URL
          </Label>
          <Input
            value={form.imageUrl}
            onChange={e => updateFormField("imageUrl", e.target.value)}
            id="product-image"
            placeholder="https://example.com/image.jpg"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-low-stock"
            className="text-left"
          >
            Low Stock Threshold
          </Label>
          <Input
            value={form.lowStockThreshold}
            onChange={e => updateFormField("lowStockThreshold", Number(e.target.value))}
            id="product-low-stock"
            placeholder="5"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {id ? (
              <Button
                onClick={e => {
                  handleUpdate(e);
                }}
              >
                Update Product
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={e => {
                  handleCreate(e);
                }}
              >
                Add Product
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
