"use client";

import { Card } from "./ui/card";

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  secondary: string;
}

export default function InfoCard({
  title,
  icon,
  value,
  secondary,
}: InfoCardProps) {
  return (
    <Card className="h-full p-8">
      <div className="flex justify-between text-lg font-semibold">
        {title}
        <span className="text-gray-600">{icon}</span>
      </div>
      <div className="text-2xl font-bold ">
        {value}
        <br />
        <span className="text-sm font-normal text-gray-600">{secondary}</span>
      </div>
    </Card>
  );
}
