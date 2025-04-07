"use client"
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import TableSkeleton from "../../components/TableSkeleton";
import DataTable from "../../components/DataTable";

import { getAllUsers } from "../data/queries";
import { useUserFilterStore } from "../stores/filter-store";
import { User } from "@/contexts/AuthContext";
import SearchInput from "./SearchInput";
import { CreateUserButton } from "./CreateUserButton";
import { ActionsList } from "./ActionsList";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "employee_id",
    header: "Matrícula",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return <ActionsList />;
    },
  },
];

export default function UsersTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const filters = useUserFilterStore((state) => state.filters);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          actionComponent={CreateUserButton}
          filtering={{ getFilters: filters, componentFilters: [SearchInput] }}
          paginate={10}
        />
      )}
    </>
  );
}
