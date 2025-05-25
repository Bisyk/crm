'use client";';

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
import { trpc } from "@/trpc/client";
import { Toaster, toast } from "sonner";

export function ProductsApi() {
  const { data: shopId, isLoading } = trpc.shop.getShopId.useQuery();

  const handleCopy = () => {
    if (!shopId) return;

    const url = `${window.location.origin}/api/v1/products/${shopId}`;
    navigator.clipboard.writeText(url).catch(error => {
      toast.error("Failed to copy the link. Please try again.");
      console.error("Failed to copy text: ", error);
    });
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog>
      <Toaster richColors />
      <DialogTrigger asChild>
        <Button>API Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share products via API</DialogTitle>
          <DialogDescription>
            Share this link with anyone who needs access to the products API.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label
              htmlFor="link"
              className="sr-only"
            >
              Link
            </Label>
            {!isLoading && (
              <Input
                id="link"
                defaultValue={`${window.location.origin}/api/v1/products/${shopId}`}
                readOnly
              />
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopy}
            disabled={isLoading}
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
