import { RowData } from "./columns";

// Sample rows data
export const rows: RowData[] = [
  {
    id: "task-1",
    text: "Implement User Authentication",
    number: 2500,
    date: "2024-04-01",
    boolean: true,
    select: "High",
    multiSelect: ["Development", "Security"],
    user: "Alice Johnson",
    rating: 4,
    toggle: true,
    checkbox: false,
  },
  {
    id: "task-2",
    text: "Design Landing Page",
    number: 1800,
    date: "2024-04-05",
    boolean: true,
    select: "Medium",
    multiSelect: ["Design", "Marketing"],
    user: "Bob Wilson",
    rating: 5,
    toggle: false,
    checkbox: true,
  },
  {
    id: "task-3",
    text: "Customer Support Training",
    number: 1200,
    date: "2024-04-10",
    boolean: false,
    select: "Low",
    multiSelect: ["Support", "Training"],
    user: "Carol Martinez",
    rating: 3,
    toggle: true,
    checkbox: false,
  },
  {
    id: "task-4",
    text: "Database Optimization",
    number: 3000,
    date: "2024-04-15",
    boolean: true,
    select: "Urgent",
    multiSelect: ["Development", "Performance"],
    user: "David Chen",
    rating: 5,
    toggle: true,
    checkbox: false,
  },
  {
    id: "task-5",
    text: "Marketing Campaign",
    number: 5000,
    date: "2024-04-20",
    boolean: true,
    select: "High",
    multiSelect: ["Marketing", "Sales"],
    user: "Emma Davis",
    rating: 4,
    toggle: false,
    checkbox: true,
  },
];
