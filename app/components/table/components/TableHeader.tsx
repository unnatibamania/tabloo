"use client";

import React from "react";
import { ColumnConfig } from "@/app/types/column";
import { TableHeader as UITableHeader, TableRow } from "@/components/ui/table";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableColumnHeader } from "./DraggableColumnHeader";

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  onColumnReorder?: (startIndex: number, endIndex: number) => void;
}

export function TableHeader<T extends Record<string, unknown>>({
  columns,
  onColumnReorder,
}: TableHeaderProps<T>) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // 10px movement before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms delay before drag starts
        tolerance: 5, // 5px movement allowed before canceling delay
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex((col) => col.id === active.id);
      const newIndex = columns.findIndex((col) => col.id === over.id);
      onColumnReorder?.(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <UITableHeader>
        <TableRow>
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <DraggableColumnHeader key={column.id} column={column} />
            ))}
          </SortableContext>
        </TableRow>
      </UITableHeader>
    </DndContext>
  );
}
