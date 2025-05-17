"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./lead";
import { Mail, Phone, PiggyBank } from "lucide-react";

interface LeadsColumn {
  id: string;
  title: string;
  leads: string[];
}

export const Droppable = ({ id, title, leads }: LeadsColumn) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style: React.CSSProperties = {
    border: isOver ? "2px dashed #3b82f6" : "1px solid lightgray",
    background: isOver ? "#f0f9ff" : "white",
    transition: "background 150ms ease, border 150ms ease",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    padding: "8px",
  };

  return (
    <div>
      <h2 className="text-start font-bold mb-2">{title}</h2>
      <ul
        ref={setNodeRef}
        style={style}
      >
        {leads.map(lead => (
          <Draggable
            key={lead.id}
            id={lead.id}
          >
            <div className="text-start">
              <p className="font-bold mb-2 flex justify-between">
                <span>
                  {lead.firstName} {lead.lastName}
                </span>
                <span className="flex gap-2 text-green-800">
                  <PiggyBank />
                  {lead.leadInterests.reduce((acc, l) => {
                    return acc + l.quantity * Number(l.product.price);
                  }, 0)}
                  $
                </span>
              </p>
              <p className="flex gap-1 items-center text-gray-700">
                <Mail className="w-4" /> {lead.email}
              </p>
              <p className="flex gap-1 items-center text-gray-700">
                <Phone className="w-4" />
                {lead.phone}
              </p>
            </div>
          </Draggable>
        ))}
      </ul>
    </div>
  );
};
