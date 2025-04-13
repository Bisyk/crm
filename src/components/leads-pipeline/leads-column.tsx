"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Draggable } from "./lead";

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
            key={lead}
            id={lead}
          >
            {lead}
          </Draggable>
        ))}
      </ul>
    </div>
  );
};
