"use client";

import React, { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Droppable } from "@/components/leads-pipeline/leads-column";

export default function LeadsPipeline() {
  const [leads, setLeads] = useState({
    New: ["Andrew", "Yaroslav", "Alex"],
    Thinking: [],
    InProgress: ["Mathew"],
    Done: [],
  });

  return (
    <div className="container mx-auto overflow-x-clip">
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={dragOverHandler}
      >
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(leads).map(key => (
            <Droppable
              key={key}
              id={key}
              title={key}
              leads={leads[key as keyof typeof leads]}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    const activeContainer = findContainerWithLead(active.id.toString());
    const overContainer =
      findContainerWithLead(over.id.toString()) || over.id.toString();

    if (!activeContainer || !overContainer) return;

    if (activeContainer !== overContainer) {
      setLeads(prev => {
        const updated = { ...prev };
        //@ts-ignore
        updated[activeContainer] = updated[activeContainer].filter(
          //@ts-ignore
          id => id !== active.id
        );
        //@ts-ignore
        updated[overContainer].push(active.id.toString());
        return updated;
      });
    }
  }

  function dragOverHandler(e: DragOverEvent) {
    const activeId = e.active.id.toString();
    const overId = e.over?.id.toString();

    const from = findContainerWithLead(activeId);
    const to = findContainerWithLead(overId ?? "") || overId;

    if (!from || !to || from === to) return;

    setLeads(prev => {
      const updated = { ...prev };
      //@ts-ignore
      updated[from] = updated[from].filter(id => id !== activeId);
      //@ts-ignore
      updated[to] = [...updated[to], activeId];
      return updated;
    });
  }

  function findContainerWithLead(leadId: string): string | undefined {
    return Object.keys(leads).find(key =>
      //@ts-ignore
      leads[key as keyof typeof leads].includes(leadId)
    );
  }
}
