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

  const mutation = trpc.brand.create.useMutation({
    onSuccess: () => {
      setName("");

      toast.success("Brand added successfully");

      utils.brand.getAll.invalidate();
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
          <Button variant="outline">Add Brand</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new brand.
            Ensure all fields are completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="brand-name"
              className="text-right"
            >
              Brand
            </Label>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              id="brand-name"
              placeholder="Apple"
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
              Add Brand
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
