"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomersTable } from "./customers-table";
import { columns } from "./columns";
import { trpc } from "@/trpc/client";

interface SendModalProps {
  id: string;
  name: string;
  template: string;
  children: React.ReactNode;
}

export default function SendModal({ id, name, template, children }: SendModalProps) {
  const { data: customerData } = trpc.customer.getAll.useQuery();

  const sendMutation = trpc.mail.sendToMultiple.useMutation({
    onSuccess: () => {
      console.log("Emails sent successfully");
    },
    onError: error => {
      console.error("Error sending emails:", error);
    },
  });

  const handleSendEmails = (selectedEmails: string[]) => {
    sendMutation.mutate({
      emails: selectedEmails,
      subject: name,
      htmlTemplate: template,
    });
  };

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
          onEmailsSend={handleSendEmails}
        />
      </DialogContent>
    </Dialog>
  );
}
