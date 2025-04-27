"use client";

import React from "react";
import { TableCell } from "@/components/ui/table";
import { ColumnConfig } from "@/app/types/column";

interface TableDataCellProps<T> {
  column: ColumnConfig<T>;
  row: T;
}

export function TableDataCell<T extends Record<string, unknown>>({
  column,
  row,
}: TableDataCellProps<T>) {
  return (
    <TableCell>
      <div className="px-2">
        {column.cell ? column.cell(row) : String(row[column.id])}
      </div>
    </TableCell>
  );
}
