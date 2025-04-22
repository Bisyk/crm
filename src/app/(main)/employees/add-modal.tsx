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
import { useForm } from "@/hooks/use-form";

const INITIAL_FORM_VALUE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  position: "",
  role: "",
  salary: 0,
  hireDate: "",
  password: "",
};

export default function AddModal() {
  const { form, resetForm, updateFormField } = useForm(INITIAL_FORM_VALUE);

  const utils = trpc.useUtils();

  const mutation = trpc.employee.create.useMutation({
    onSuccess: () => {
      resetForm();

      toast.success("Employee added successfully");

      utils.employee.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Employee not added. Please check your inputs and try again."
      );
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(form);
  };

  return (
    <Dialog>
      <Toaster richColors />
       <div className="w-full flex justify-start items center">
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new employee. Ensure all fields
            are completed accurately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="first-name"
              className="text-right"
            >
              First Name
            </Label>
            <Input
              value={form.firstName}
              onChange={e => updateFormField("firstName", e.target.value)}
              id="first-name"
              placeholder="John"
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
              placeholder="Doe"
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
              htmlFor="password"
              className="text-right"
            >
              Password
            </Label>
            <Input
              value={form.password}
              onChange={e => updateFormField("password", e.target.value)}
              id="password"
              placeholder="*********"
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
              htmlFor="position"
              className="text-right"
            >
              Position
            </Label>
            <Input
              value={form.position}
              onChange={e => updateFormField("position", e.target.value)}
              id="position"
              placeholder="Sales Manager"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="role"
              className="text-right"
            >
              Role
            </Label>
            <Input
              value={form.role}
              onChange={e => updateFormField("role", e.target.value)}
              id="role"
              placeholder="Employee"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="salary"
              className="text-right"
            >
              Salary
            </Label>
            <Input
              value={form.salary}
              onChange={e => updateFormField("salary", Number(e.target.value))}
              id="salary"
              placeholder="50000"
              type="text"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="hire-date"
              className="text-right"
            >
              Hire Date
            </Label>
            <Input
              value={form.hireDate}
              onChange={e => updateFormField("hireDate", e.target.value)}
              id="hire-date"
              placeholder="YYYY-MM-DD"
              type="date"
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
              Add Employee
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
