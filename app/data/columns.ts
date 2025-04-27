import { ColumnConfig } from "../types/column";

// Define the structure for our row data
export interface RowData {
  id: string;
  text: string;
  number: number;
  date: string;
  boolean: boolean;
  select: string;
  multiSelect: string[];
  user: string;
  rating: number;
  toggle: boolean;
  checkbox: boolean;
}

// Sample columns configuration
export const columns: ColumnConfig<RowData>[] = [
  {
    id: "text",
    header: "Title",
    type: "text",
    minWidth: 200,
    isEditable: true,
    isSortable: true,
    isResizable: true,
    isDraggable: true,
    cell: (row) => row.text,
  },
  {
    id: "number",
    header: "Amount",
    type: "number",
    minWidth: 120,
    isEditable: true,
    isSortable: true,
    cell: (row) => row.number,
  },
  {
    id: "date",
    header: "Due Date",
    type: "date",
    minWidth: 150,
    isEditable: true,
    isSortable: true,
    cell: (row) => row.date,
  },

  {
    id: "select",
    header: "Priority",
    type: "select",
    selectOptions: ["Low", "Medium", "High", "Urgent"],
    minWidth: 120,
    isEditable: true,
    cell: (row) => row.select,
  },
  {
    id: "multiSelect",
    header: "Categories",
    type: "multi-select",
    multiSelectOptions: [
      "Development",
      "Design",
      "Marketing",
      "Sales",
      "Support",
    ],
    minWidth: 200,
    isEditable: true,
    cell: (row) => row.multiSelect,
  },
  {
    id: "user",
    header: "Assigned To",
    type: "user",
    minWidth: 150,
    isEditable: true,
    cell: (row) => row.user,
  },
  {
    id: "rating",
    header: "Satisfaction",
    type: "rating",
    minWidth: 150,
    isEditable: true,
    cell: (row) => row.rating,
  },
  {
    id: "toggle",
    header: "Notifications",
    type: "toggle",
    minWidth: 120,
    isEditable: true,
    cell: (row) => row.toggle,
  },
  {
    id: "checkbox",
    header: "Complete",
    type: "checkbox",
    minWidth: 100,
    isEditable: true,
    cell: (row) => row.checkbox,
  },
];
