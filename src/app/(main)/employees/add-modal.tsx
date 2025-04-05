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
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState<number | "">("");
  const [hireDate, setHireDate] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const mutation = trpc.employee.create.useMutation({
    onSuccess: () => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPosition("");
      setRole("");
      setSalary("");
      setHireDate("");
      setPassword("");

      toast.success("Employee added successfully");

      router.refresh();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Employee not added. Please check your inputs and try again."
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
      position,
      role,
      salary: salary === "" ? 0 : salary,
      hireDate,
      password,
    });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <div className="w-full flex justify-end mb-2">
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new employee to your database.
            Ensure all fields are completed accurately.
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
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={e => setLastName(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              value={phone}
              onChange={e => setPhone(e.target.value)}
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
              value={position}
              onChange={e => setPosition(e.target.value)}
              id="position"
              placeholder="Software Engineer"
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
              value={role}
              onChange={e => setRole(e.target.value)}
              id="role"
              placeholder="Developer"
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
              value={salary}
              onChange={e => setSalary(Number(e.target.value) || "")}
              id="salary"
              placeholder="50000"
              type="number"
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
              value={hireDate}
              onChange={e => setHireDate(e.target.value)}
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
