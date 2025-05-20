"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/use-form";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

const INITIAL_FORM_VALUE = {
  name: "",
  description: "",
  template: "",
};

interface AddModalProps {
  id?: string;
  children: React.ReactNode;
}

export function AddModal({ id, children }: AddModalProps) {
  const { form, resetForm, updateFormField } = useForm(INITIAL_FORM_VALUE);

  const { data: campaignData } = trpc.campaign.getById.useQuery(id!, {
    enabled: !!id,
  });

  const utils = trpc.useUtils();

  useEffect(() => {
    if (campaignData) {
      updateFormField("name", campaignData.name);
      updateFormField("description", campaignData.description);
      updateFormField("template", campaignData.template);
    }
  }, [campaignData]);

  const addMutation = trpc.campaign.create.useMutation({
    onSuccess: () => {
      resetForm();
      toast.success("Campaign created successfully");
      utils.campaign.getAll.invalidate();
    },
    onError: error => {
      toast.error("Failed to create campaign. Please try again.");
    },
  });

  const updateMutation = trpc.campaign.update.useMutation({
    onSuccess: () => {
      toast.success("Campaign updated successfully");
      utils.campaign.getAll.invalidate();
    },
    onError: error => {
      toast.error("Failed to update campaign. Please try again.");
    },
  });

  const handleSubmit = () => {
    addMutation.mutate({
      name: form.name,
      description: form.description,
      template: form.template,
    });
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: id!,
      name: form.name,
      description: form.description,
      template: form.template,
    });
  };

  return (
    <Dialog>
      <Toaster richColors />
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{id ? "Edit" : "Add"} Campaign</DialogTitle>
          <DialogDescription>
            Fill in the details for the new campaign.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="campaign-name"
              className="text-right"
            >
              Name
            </Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name"
              className="col-span-4"
              value={form.name}
              onChange={e => updateFormField("name", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="campaign-description"
              className="text-right"
            >
              Description
            </Label>
            <Input
              id="campaign-description"
              placeholder="Enter campaign description"
              className="col-span-4"
              value={form.description}
              onChange={e => updateFormField("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-template">Template</Label>
              <Textarea
                id="campaign-template"
                placeholder="Enter campaign template"
                className="h-[400px] resize-none"
                value={form.template}
                onChange={e => updateFormField("template", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-preview">Preview</Label>
              <div className="border rounded-md h-[400px] p-2 overflow-scroll">
                <div
                  dangerouslySetInnerHTML={{
                    __html: form.template,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={id ? handleUpdate : handleSubmit}
          >
            {id ? "Update" : "Create"} Campaign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
