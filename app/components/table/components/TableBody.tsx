"use client";

import React from "react";
import { ColumnConfig } from "@/app/types/column";
import {
  TableBody as UITableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface TableBodyProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
}

export function TableBody<T>({ columns, data }: TableBodyProps<T>) {
  return (
    <UITableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column) => (
            <TableCell key={`${rowIndex}-${column.id}`}>
              {column.cell ? column.cell(row) : String(row[column.id])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </UITableBody>
  );
}
