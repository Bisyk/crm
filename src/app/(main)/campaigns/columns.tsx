"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Send, Trash } from "lucide-react";
import { AddModal } from "./add-modal";
import DeleteDialog from "./delete-dialog";
import SendModal from "./send-modal/send-modal";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  template: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex items-center gap-2">
          <DeleteDialog id={id}>
            <Trash />
          </DeleteDialog>
          <AddModal id={id}>
            <Pencil />
          </AddModal>
          <SendModal id={id}>
            <Send />
          </SendModal>
        </div>
      );
    },
  },
];
