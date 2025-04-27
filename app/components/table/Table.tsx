"use client";

import React, { useState, useCallback } from "react";
import { ColumnConfig } from "../../types/column";
import { Table as UITable } from "@/components/ui/table";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";

interface TableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  isRowSelectionEnabled?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
}

export function Table<T extends { id: string }>({
  columns: initialColumns,
  data,
  isRowSelectionEnabled = false,
  onSelectionChange,
}: TableProps<T>) {
  const [columns, setColumns] = useState<ColumnConfig<T>[]>(initialColumns);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const handleColumnReorder = (startIndex: number, endIndex: number) => {
    const newColumns = [...columns];
    const [removed] = newColumns.splice(startIndex, 1);
    newColumns.splice(endIndex, 0, removed);
    setColumns(newColumns);
  };

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelectedRows = new Set<string>();
      if (checked) {
        data.forEach((row) => newSelectedRows.add(row.id));
      }
      setSelectedRows(newSelectedRows);
      onSelectionChange?.(
        Array.from(newSelectedRows).map(
          (id) => data.find((row) => row.id === id)!
        )
      );
    },
    [data, onSelectionChange]
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
          (id) => data.find((row) => row.id === id)!
        )
      );
    },
    [selectedRows, data, onSelectionChange]
  );

  const isAllSelected = data.length > 0 && selectedRows.size === data.length;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;

  return (
    <UITable>
      <TableHeader
        columns={columns}
        onColumnReorder={handleColumnReorder}
        isRowSelectionEnabled={isRowSelectionEnabled}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        onSelectAll={handleSelectAll}
      />
      <TableBody
        columns={columns}
        data={data}
        isRowSelectionEnabled={isRowSelectionEnabled}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
      />
    </UITable>
  );
}
