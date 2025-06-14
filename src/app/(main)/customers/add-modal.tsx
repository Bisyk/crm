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
import { trpc } from "@/trpc/client";
import { useForm } from "@/hooks/use-form";
import { useEffect } from "react";

const INITIAL_FORM_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

interface AddModalProps {
  id?: string;
  children: React.ReactNode;
}

export default function AddModal({ id, children }: AddModalProps) {
  const { form, resetForm, updateFormField } = useForm(INITIAL_FORM_VALUE);

  const utils = trpc.useUtils();

  const { data: customerData } = trpc.customer.getById.useQuery(id!, {
    enabled: !!id,
  });

  useEffect(() => {
    if (customerData) {
      updateFormField("firstName", customerData.firstName);
      updateFormField("lastName", customerData.lastName);
      updateFormField("email", customerData.email);
      updateFormField("phone", customerData.phone);
      updateFormField("address", customerData.address);
    }
  }, [customerData]);

  const mutation = trpc.customer.create.useMutation({
    onSuccess: () => {
      resetForm();

      toast.success("Customer added successfully");

      utils.customer.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Customer not added. Please check your inputs and try again."
      );
    },
  });

  const updateMutation = trpc.customer.update.useMutation({
    onSuccess: () => {
      toast.success("Customer updated successfully");

      utils.customer.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Customer not updated. Please check your inputs and try again."
      );
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(form);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    updateMutation.mutate({ id, ...form });
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (id) {
      handleUpdate(e);
    } else {
      handleCreate(e);
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new customer. Ensure all fields
            are completed accurately.
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
              value={form.firstName}
              onChange={e => updateFormField("firstName", e.target.value)}
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
              value={form.lastName}
              onChange={e => updateFormField("lastName", e.target.value)}
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
              value={form.email}
              onChange={e => updateFormField("email", e.target.value)}
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
              value={form.phone}
              onChange={e => updateFormField("phone", e.target.value)}
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
              value={form.address}
              onChange={e => updateFormField("address", e.target.value)}
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
                handleSubmit(e);
              }}
            >
              {`${id ? "Edit Customer" : "Add Customer"}`}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
