"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@/hooks/use-form";
import { trpc } from "@/trpc/client";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const INITIAL_FORM_VALUE = {
  smtpHost: "",
  smtpPort: "",
  smtpUser: "",
  smtpPassword: "",
  smtpFrom: "",
};

export default function EmailSettingsTab() {
  const { form, updateFormField } = useForm(INITIAL_FORM_VALUE);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { data: smtpData } = trpc.smtp.get.useQuery();

  useEffect(() => {
    if (smtpData) {
      updateFormField("smtpHost", smtpData.smtpHost);
      updateFormField("smtpPort", smtpData.smtpPort.toString());
      updateFormField("smtpUser", smtpData.smtpUser);
      updateFormField("smtpPassword", smtpData.smtpPassword);
      updateFormField("smtpFrom", smtpData.smtpFrom);
    }
  }, [smtpData]);

  const updateMutation = trpc.smtp.updateSmtp.useMutation({
    onSuccess: () => {
      toast.success("SMTP settings saved successfully");
    },
    onError: () => {
      toast.error("Failed to save SMTP settings");
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate({ ...form, smtpPort: Number(form.smtpPort) });
  };

  return (
    <div className="container mx-auto">
      <Toaster richColors />
      <hr className="my-2" />
      <Label
        htmlFor="smtp-server"
        className="mb-2"
      >
        SMTP Server
      </Label>
      <Input
        id="smtp-host"
        value={form.smtpHost}
        onChange={e => updateFormField("smtpHost", e.target.value)}
      />

      <Label
        htmlFor="smtp-port"
        className="mb-2 mt-4"
      >
        SMTP Port
      </Label>
      <Input
        id="smtp-port"
        value={form.smtpPort}
        onChange={e => updateFormField("smtpPort", e.target.value)}
      />

      <Label
        htmlFor="smtp-from"
        className="mb-2 mt-4"
      >
        SMTP From (it will be shown as sender name)
      </Label>
      <Input
        id="smtp-from"
        value={form.smtpFrom}
        onChange={e => updateFormField("smtpFrom", e.target.value)}
      />

      <Label
        htmlFor="smtp-username"
        className="mb-2 mt-4"
      >
        SMTP Username (usually email address)
      </Label>
      <Input
        id="smtp-username"
        value={form.smtpUser}
        onChange={e => updateFormField("smtpUser", e.target.value)}
      />

      <Label
        htmlFor="smtp-password"
        className="mb-2 mt-4"
      >
        SMTP Password
      </Label>

      <div className="relative">
        <Input
          id="smtp-password"
          type={isPasswordVisible ? "text" : "password"}
          value={form.smtpPassword}
          onChange={e => updateFormField("smtpPassword", e.target.value)}
        />
        <Button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 "
        >
          {isPasswordVisible ? <Eye /> : <EyeClosed />}
        </Button>
      </div>

      <div className="flex items-center justify-end mt-4">
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </div>
  );
}
