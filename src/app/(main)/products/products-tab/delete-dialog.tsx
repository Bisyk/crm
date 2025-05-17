import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { PropsWithChildren } from "react";
import { toast, Toaster } from "sonner";

interface DeleteDialogProps {
  id: string;
}

export default function DeleteDialog({
  id,
  children,
}: PropsWithChildren<DeleteDialogProps>) {
  const mutation = trpc.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      utils.product.getAll.invalidate();
    },
    onError: () => {
      toast.error(
        "Ooooops! Something went wrong. Product not deleted. Please try again."
      );
    },
  });

  const utils = trpc.useUtils();

  const handleDelete = async () => {
    mutation.mutate(id);
  };

  return (
    <AlertDialog>
      <Toaster richColors />
      <AlertDialogTrigger asChild>
        <Button>{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete product
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Accept</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
