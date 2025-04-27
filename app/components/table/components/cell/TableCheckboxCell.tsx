"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableHead } from "@/components/ui/table";

interface TableCheckboxCellProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ariaLabel: string;
  isHeader?: boolean;
  isIndeterminate?: boolean;
}

export function TableCheckboxCell({
  checked,
  onCheckedChange,
  ariaLabel,
  isHeader = false,
  isIndeterminate = false,
}: TableCheckboxCellProps) {
  const Component = isHeader ? TableHead : TableCell;

  return (
    <Component className="w-[50px] px-4 !pr-0">
      <div className="flex h-full items-center justify-center">
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(!!checked)}
          aria-label={ariaLabel}
          data-state={
            isIndeterminate
              ? "indeterminate"
              : checked
              ? "checked"
              : "unchecked"
          }
        />
      </div>
    </Component>
  );
}
