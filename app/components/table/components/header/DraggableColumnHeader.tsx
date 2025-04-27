"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableHead } from "@/components/ui/table";
import { ColumnConfig } from "@/app/types/column";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc" | null;

interface DraggableColumnHeaderProps<T> {
  column: ColumnConfig<T>;
  sortDirection?: SortDirection;
  onSort?: () => void;
}

export function DraggableColumnHeader<T>({
  column,
  sortDirection,
  onSort,
}: DraggableColumnHeaderProps<T>) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    width: column.minWidth,
    touchAction: "none",
  };

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative select-none touch-none",
        isDragging && [
          "z-50",
          "after:absolute after:inset-0 after:bg-background/50 after:backdrop-blur-sm",
        ]
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 h-full",
          isDragging && "relative z-50"
        )}
      >
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 cursor-grab active:cursor-grabbing hover:bg-muted/50 rounded p-1 transition-colors"
        >
          <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-500" />
        </div>
        <div className="min-w-0 flex-1 flex items-center gap-2">
          <span className="font-medium truncate">{column.header}</span>
          {column.isSortable && (
            <div onClick={onSort}>
              {/* {sortDirection === "asc" && (
                <ChevronUp className="h-2 w-2 text-primary" />
              )}
              {sortDirection === "desc" && (
                <ChevronDown className="h-2 w-2 text-primary" />
              )} */}
              {/* {sortDirection === null && ( */}
              <div className="flex flex-col  text-muted-foreground">
                <ChevronUp
                  className={
                    sortDirection === "asc" ? "h-3 w-3 text-primary" : "h-3 w-3"
                  }
                />
                <ChevronDown
                  className={
                    sortDirection === "desc"
                      ? "h-3 w-3 text-primary"
                      : "h-3 w-3"
                  }
                />
              </div>
              {/* )} */}
              <span className="sr-only">Sort by {column.header}</span>
            </div>
          )}
        </div>
      </div>
    </TableHead>
  );
}
