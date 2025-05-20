"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomersTable } from "./customers-table";
import { columns } from "./columns";
import { trpc } from "@/trpc/client";

interface SendModalProps {
  id: string;
  children: React.ReactNode;
}

export default function SendModal({ id, children }: SendModalProps) {
  const { data: customerData } = trpc.customer.getAll.useQuery();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Campaign</DialogTitle>
          <DialogDescription>
            Choose customers to send the campaign to.
          </DialogDescription>
        </DialogHeader>
        <CustomersTable
          columns={columns}
          data={customerData}
        />
      </DialogContent>
    </Dialog>
  );
}
