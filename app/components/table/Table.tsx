"use client";

import React, { useState } from "react";
import { ColumnConfig } from "../../types/column";
import { Table as UITable } from "@/components/ui/table";
import { TableHeader } from "./components/TableHeader";
import { TableBody } from "./components/TableBody";

interface TableProps<T> {
  columns: ColumnConfig<T>[];
  data: T[];
}

export function Table<T>({ columns: initialColumns, data }: TableProps<T>) {
  const [columns, setColumns] = useState<ColumnConfig<T>[]>(initialColumns);

  const handleColumnReorder = (startIndex: number, endIndex: number) => {
    const newColumns = [...columns];
    const [removed] = newColumns.splice(startIndex, 1);
    newColumns.splice(endIndex, 0, removed);
    setColumns(newColumns);
  };

  return (
    <UITable>
      <TableHeader columns={columns} onColumnReorder={handleColumnReorder} />
      <TableBody columns={columns} data={data} />
    </UITable>
  );
}
