"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";

interface LeadProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable = (props: LeadProps) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: props.id,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        //transition: transition,
        cursor: "grab",
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="border rounded-xl p-2 m-1"
    >
      <li>{props.children}</li>
    </button>
  );
};
