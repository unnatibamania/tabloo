import { ColumnConfig } from "./column";

export interface TableProps<T> {
  columns: ColumnConfig<T>[];
  rows: T[];
  isRowSelectionEnabled?: boolean;
  canEditRow?: boolean;
  canEditColumn?: boolean;
  canDeleteRow?: boolean;
  canDeleteColumn?: boolean;

  onRowCellEdit?: (row: T, column: ColumnConfig<T>) => void;
  onRowCellDelete?: (row: T, column: ColumnConfig<T>) => void;
  onColumnCellEdit?: (row: T, column: ColumnConfig<T>) => void;
  onColumnCellDelete?: (row: T, column: ColumnConfig<T>) => void;

  classNames: {
    table?: string;
    header?: string;
    row?: string;
    cell?: string;
  };
  emptyState?: React.ReactNode;
}
