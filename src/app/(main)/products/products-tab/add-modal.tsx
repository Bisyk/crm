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

import { useState } from "react";
import { trpc } from "@/trpc/client";

export default function AddModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState<string | "">("");
  const [brandId, setBrandId] = useState<string | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState(5);

  const utils = trpc.useUtils();

  const mutation = trpc.product.create.useMutation({
    onSuccess: () => {
      setName("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      setCategoryId("");
      setBrandId("");
      setImageUrl("");
      setLowStockThreshold(0);
      setCategoryId("");
      setBrandId("");

      toast.success("Product added successfully");

      utils.product.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Product not added. Please check your inputs and try again."
      );
    },
  });

  const { data: categories } = trpc.category.getAll.useQuery();
  const { data: brands } = trpc.brand.getAll.useQuery();

  console.log(categories);
  console.log(brands);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
      description,
      price,
      stockCount: quantity,
      lowStockThreshold,
      categoryId,
      brandId,
      imageUrl,
    });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Product</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to your database.
            Ensure all fields are completed accurately.
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
              value={name}
              onChange={e => setName(e.target.value)}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
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
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
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
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            id="product-quantity"
            placeholder="10"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="product-category"
            className="text-right"
          >
            Category
          </Label>
          <Select onValueChange={value => setCategoryId(value)}>
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
          <Select onValueChange={value => setBrandId(value)}>
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
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
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
            value={lowStockThreshold}
            onChange={e => setLowStockThreshold(Number(e.target.value))}
            id="product-low-stock"
            placeholder="5"
            type="text"
            required
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={e => {
                handleCreate(e);
              }}
            >
              Add Product
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
