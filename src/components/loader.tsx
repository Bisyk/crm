"use client";

import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
