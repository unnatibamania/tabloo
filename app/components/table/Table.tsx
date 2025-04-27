"use client";

import React, { useState, useCallback } from "react";
import { ColumnConfig } from "../../types/column";
import { Table as UITable } from "@/components/ui/table";
import { TableHeader } from "./components/header/TableHeader";
import { TableBody } from "./components/body/TableBody";
import type { SortState } from "./components/header/TableHeader";

interface TableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  isRowSelectionEnabled?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";
}

export function Table<T extends { id: string }>({
  columns: initialColumns,
  data: initialData,
  isRowSelectionEnabled = false,
  onSelectionChange,
  defaultSortColumn,
  defaultSortDirection,
}: TableProps<T>) {
  const [columns, setColumns] = useState<
    (ColumnConfig<T> & { width: number })[]
  >(
    initialColumns.map((col) => ({
      ...col,
      width: col.minWidth || 150,
    }))
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortState, setSortState] = useState<SortState | undefined>(
    defaultSortColumn
      ? {
          columnId: defaultSortColumn,
          direction: defaultSortDirection ?? "asc",
        }
      : undefined
  );

  const handleColumnReorder = (startIndex: number, endIndex: number) => {
    const newColumns = [...columns];
    const [removed] = newColumns.splice(startIndex, 1);
    newColumns.splice(endIndex, 0, removed);
    setColumns(newColumns);
  };

  const handleColumnResize = useCallback(
    (columnId: string, newWidth: number) => {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === columnId ? { ...col, width: newWidth } : col
        )
      );
    },
    []
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelectedRows = new Set<string>();
      if (checked) {
        initialData.forEach((row) => newSelectedRows.add(row.id));
      }
      setSelectedRows(newSelectedRows);
      onSelectionChange?.(
        Array.from(newSelectedRows).map(
          (id) => initialData.find((row) => row.id === id)!
        )
      );
    },
    [initialData, onSelectionChange]
  );

  const handleSelectRow = useCallback(
    (rowId: string, checked: boolean) => {
      const newSelectedRows = new Set(selectedRows);
      if (checked) {
        newSelectedRows.add(rowId);
      } else {
        newSelectedRows.delete(rowId);
      }
      setSelectedRows(newSelectedRows);
      onSelectionChange?.(
        Array.from(newSelectedRows).map(
          (id) => initialData.find((row) => row.id === id)!
        )
      );
    },
    [selectedRows, initialData, onSelectionChange]
  );

  const handleSort = useCallback((newSortState: SortState) => {
    setSortState(newSortState.direction === null ? undefined : newSortState);
  }, []);

  const sortedData = React.useMemo(() => {
    if (!sortState) return initialData;

    const column = columns.find((col) => col.id === sortState.columnId);
    if (!column?.isSortable) return initialData;

    return [...initialData].sort((a, b) => {
      const aValue = a[column.id as keyof T];
      const bValue = b[column.id as keyof T];
      const direction = sortState.direction === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction;
      }

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }, [initialData, columns, sortState]);

  const isAllSelected =
    initialData.length > 0 && selectedRows.size === initialData.length;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < initialData.length;

  return (
    <div className="w-full overflow-x-auto">
      <UITable>
        <TableHeader
          columns={columns}
          onColumnReorder={handleColumnReorder}
          isRowSelectionEnabled={isRowSelectionEnabled}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortState={sortState}
          onColumnResize={handleColumnResize}
        />
        <TableBody
          columns={columns}
          data={sortedData}
          isRowSelectionEnabled={isRowSelectionEnabled}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
        />
      </UITable>
    </div>
  );
}
