"use client";

import React from "react";
import { ColumnConfig } from "@/app/types/column";
import { TableBody as UITableBody } from "@/components/ui/table";
import { TableRow } from "./TableRow";

interface TableBodyProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
  isRowSelectionEnabled?: boolean;
  selectedRows?: Set<string>;
  onSelectRow?: (rowId: string, checked: boolean) => void;
}

export function TableBody<T extends { id: string } & Record<string, unknown>>({
  columns,
  data,
  isRowSelectionEnabled = false,
  selectedRows = new Set(),
  onSelectRow,
}: TableBodyProps<T>) {
  return (
    <UITableBody>
      {data.map((row, rowIndex) => (
        <TableRow
          key={row.id}
          row={row}
          columns={columns}
          rowIndex={rowIndex}
          isRowSelectionEnabled={isRowSelectionEnabled}
          isSelected={selectedRows.has(row.id)}
          onSelectRow={onSelectRow}
        />
      ))}
    </UITableBody>
  );
}
