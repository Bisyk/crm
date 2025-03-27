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
import { useRouter } from "next/navigation";

export default function AddModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  const mutation = trpc.customer.create.useMutation({
    onSuccess: () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      
      toast.success("Customer added successfully");
      
      router.refresh();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Customer not added. Please check your inputs and try again."
      );
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      firstName,
      lastName,
      email,
      phone,
      address,
    });
  };

  return (
    <Dialog>
      <Toaster />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Customer</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new customer to your database.
            Ensure all fields are completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="name"
              className="text-right"
            >
              First Name
            </Label>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              id="first-name"
              placeholder="Yaroslav"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="last-name"
              className="text-right"
            >
              Last Name
            </Label>
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              id="last-name"
              placeholder="Bisyk"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="email"
              className="text-right"
            >
              Email
            </Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              placeholder="example@example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="phone"
              className="text-right"
            >
              Phone
            </Label>
            <Input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              id="phone"
              placeholder="+1234567890"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="address"
              className="text-right"
            >
              Address
            </Label>
            <Input
              value={address}
              onChange={e => setAddress(e.target.value)}
              id="address"
              placeholder="123 Main St"
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
              Add Customer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
