"use client";

import React from "react";
import { TableRow as UITableRow } from "@/components/ui/table";
import { ColumnConfig } from "@/app/types/column";
import { TableCheckboxCell } from "../cell/TableCheckboxCell";
import { TableDataCell } from "../cell/TableDataCell";

interface TableRowProps<T> {
  row: T;
  columns: ColumnConfig<T>[];
  isRowSelectionEnabled?: boolean;
  isSelected?: boolean;
  onSelectRow?: (rowId: string, checked: boolean) => void;
  rowIndex: number;
}

export function TableRow<T extends { id: string } & Record<string, unknown>>({
  row,
  columns,
  isRowSelectionEnabled = false,
  isSelected = false,
  onSelectRow,
  rowIndex,
}: TableRowProps<T>) {
  const handleCheckboxChange = (checked: boolean) => {
    onSelectRow?.(row.id, checked);
  };

  return (
    <UITableRow>
      {isRowSelectionEnabled && (
        <TableCheckboxCell
          checked={isSelected}
          onCheckedChange={handleCheckboxChange}
          ariaLabel={`Select row ${rowIndex + 1}`}
        />
      )}
      {columns.map((column) => (
        <TableDataCell key={column.id} column={column} row={row} />
      ))}
    </UITableRow>
  );
}
