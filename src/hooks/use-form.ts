import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues);

  const resetForm = () => {
    setForm(initialValues);
  };

  const updateFormField = <K extends keyof T>(field: K, value: T[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return { form, setForm, resetForm, updateFormField };
}
