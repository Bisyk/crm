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

import { useState } from "react";
import { trpc } from "@/trpc/client";

export default function AddModal() {
  const [name, setName] = useState("");

  const utils = trpc.useUtils();

  const mutation = trpc.category.create.useMutation({
    onSuccess: () => {
      setName("");

      toast.success("Customer added successfully");

      utils.category.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Category not added. Please check your inputs and try again."
      );
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
    });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new category.
            Ensure all fields are completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="category-name"
              className="text-right"
            >
              Category
            </Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="category-name"
              placeholder="Laptops"
              type="text"
              required
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={e => {
                handleCreate(e);
              }}
            >
              Add Category
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
