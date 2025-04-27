"use client";

import { Table } from "./components/table/Table";
import { ColumnConfig } from "./types/column";

interface SampleData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: string;
}

const sampleData: SampleData[] = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    email: "john@example.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 25,
    email: "jane@example.com",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Bob Johnson",
    age: 35,
    email: "bob@example.com",
    status: "Active",
  },
];

const columns: ColumnConfig<SampleData>[] = [
  {
    id: "name",
    header: "Name",
    type: "text",
    minWidth: 150,
    cell: (row) => <div>{row.name}</div>,
    isSortable: true,
  },
  {
    id: "age",
    header: "Age",
    type: "number",
    minWidth: 100,
    cell: (row) => <div>{row.age}</div>,
    isSortable: true,
  },
  {
    id: "email",
    header: "Email",
    type: "text",
    minWidth: 200,
    cell: (row) => <div>{row.email}</div>,
  },
  {
    id: "status",
    header: "Status",
    type: "select",
    selectOptions: ["Active", "Inactive"],
    minWidth: 120,
    cell: (row) => <div>{row.status}</div>,
    isSortable: true,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Data Grid Example</h1>
        <div className="rounded-md border">
          <Table
            columns={columns}
            isRowSelectionEnabled
            data={sampleData}
            onSelectionChange={(selectedRows) => {
              console.log(selectedRows);
            }}
          />
        </div>
      </div>
    </div>
  );
}
