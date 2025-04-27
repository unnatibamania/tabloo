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
import { DraggableColumnHeader, SortDirection } from "./DraggableColumnHeader";
import { TableCheckboxCell } from "../cell/TableCheckboxCell";

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

interface TableHeaderProps<T> {
  columns: (ColumnConfig<T> & { width: number })[];
  onColumnReorder?: (startIndex: number, endIndex: number) => void;
  isRowSelectionEnabled?: boolean;
  isAllSelected?: boolean;
  isIndeterminate?: boolean;
  onSelectAll?: (checked: boolean) => void;
  onSort?: (sortState: SortState) => void;
  sortState?: SortState;
  onColumnResize?: (columnId: string, width: number) => void;
}

export function TableHeader<T extends Record<string, unknown>>({
  columns,
  onColumnReorder,
  isRowSelectionEnabled = false,
  isAllSelected = false,
  isIndeterminate = false,
  onSelectAll,
  onSort,
  sortState,
  onColumnResize,
}: TableHeaderProps<T>) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
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

  const handleSort = (columnId: string) => {
    if (!onSort) return;

    const newDirection: SortDirection =
      sortState?.columnId === columnId
        ? sortState.direction === "asc"
          ? "desc"
          : sortState.direction === "desc"
          ? null
          : "asc"
        : "asc";

    onSort({
      columnId,
      direction: newDirection,
    });
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
          {isRowSelectionEnabled && (
            <TableCheckboxCell
              checked={isAllSelected}
              onCheckedChange={(checked: boolean) => onSelectAll?.(checked)}
              ariaLabel="Select all"
              isHeader
              isIndeterminate={isIndeterminate}
            />
          )}
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <DraggableColumnHeader
                key={column.id}
                column={column}
                width={column.width}
                sortDirection={
                  sortState?.columnId === column.id ? sortState.direction : null
                }
                onSort={() => handleSort(column.id)}
                onResize={(width) => onColumnResize?.(column.id, width)}
              />
            ))}
          </SortableContext>
        </TableRow>
      </UITableHeader>
    </DndContext>
  );
}
