export type ColumnType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "multi-select"
  | "user"
  | "rating"
  | "toggle"
  | "checkbox";

type BaseColumnConfig<T> = {
  id: string;
  header: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  isSortable?: boolean;
  isHidden?: boolean;
  isResizable?: boolean;
  isEditable?: boolean;
  isDeletable?: boolean;
  isDraggable?: boolean;
  cell?: (row: T) => React.ReactNode;
};

// Type union for all possible column configurations
export type ColumnConfig<T> =
  | (BaseColumnConfig<T> & {
      type: "select";
      selectOptions: string[];
      multiSelectOptions?: never;
    })
  | (BaseColumnConfig<T> & {
      type: "multi-select";
      multiSelectOptions: string[];
      selectOptions?: never;
    })
  | (BaseColumnConfig<T> & {
      type: Exclude<ColumnType, "select" | "multi-select">;
      selectOptions?: never;
      multiSelectOptions?: never;
    });
