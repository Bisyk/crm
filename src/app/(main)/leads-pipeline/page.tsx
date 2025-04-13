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
        const newLead = {
          id: lead.id,
          firstName: lead.firstName,
          lastName: lead.lastName,
        };

        if (lead.stage === "New") {
          updatedLeads.New.push(newLead);
        }

        if (lead.stage === "Thinking") {
          updatedLeads.Thinking.push(newLead);
        }

        if (lead.stage === "InProgress") {
          updatedLeads.InProgress.push(newLead);
        }

        if (lead.stage === "Done") {
          updatedLeads.Done.push(newLead);
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
    console.log("drag end");
    const { active, over } = e;

    console.log("drag end active: ", active);
    console.log("drag end over: ", over);

    handleStageChange(active.id, over.id);

    if (!over || active.id === over.id) return;

    const activeContainer = findContainerWithLead(active.id.toString());
    const overContainer =
      findContainerWithLead(over.id.toString()) || over.id.toString();

    console.log("drag end activeContainer: ", activeContainer);
    console.log("drag end overContainer: ", overContainer);

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
    console.log("drag over");
    const activeId = e.active.id.toString();
    const overId = e.over?.id.toString();

    const from = findContainerWithLead(activeId);
    const to = findContainerWithLead(overId ?? "") || overId;

    console.log("drag over activeId: ", activeId);
    console.log("drag over overId: ", overId);
    console.log("drag over from: ", from);
    console.log("drag over to:", to);

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
