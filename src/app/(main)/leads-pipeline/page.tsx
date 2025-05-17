"use client";

import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { Droppable } from "@/components/leads-pipeline/leads-column";
import { trpc } from "@/trpc/client";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  stage?: string;
}

export default function LeadsPipeline() {
  const utils = trpc.useUtils();

  const { data: fetchedLeads, isFetched } = trpc.lead.getAll.useQuery();

  const updateMutation = trpc.lead.updateStage.useMutation({
    onSuccess: () => {
      utils.lead.getAll.invalidate();
    },
  });

  const handleStageChange = (id: string, stage: string) => {
    updateMutation.mutate({ id, stage });
  };

  const [leads, setLeads] = useState<Record<string, Lead[]>>({
    New: [],
    Thinking: [],
    InProgress: [],
    Done: [],
  });

  useEffect(() => {
    if (isFetched) {
      console.log(fetchedLeads);
      const updatedLeads: Record<string, Lead[]> = {
        New: [],
        Thinking: [],
        InProgress: [],
        Done: [],
      };

      fetchedLeads.forEach((lead: Lead) => {
        if (lead.stage && leads[lead.stage]) {
          updatedLeads[lead.stage].unshift(lead);
        }
      });

      console.log(updatedLeads);

      setLeads(updatedLeads);
    }
  }, [fetchedLeads]);

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
              leads={leads[key]}
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
      handleStageChange(active.id.toString(), overContainer);
    }
  }

  function dragOverHandler(e: DragOverEvent) {
    const activeId = e.active.id.toString();
    const overId = e.over?.id.toString();

    const from = findContainerWithLead(activeId);
    const to = findContainerWithLead(overId ?? "") || overId;

    if (!from || !to || from === to) return;
  }

  function findContainerWithLead(leadId: string): string | undefined {
    return Object.keys(leads).find(key =>
      leads[key].some(lead => lead.id === leadId)
    );
  }
}
