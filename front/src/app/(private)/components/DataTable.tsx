"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  ColumnFilter,
  PaginationState,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Filters {
  getFilters: ColumnFilter[];
  componentFilters: React.ComponentType[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionComponent?: React.ComponentType;
  filtering?: Filters;
  paginate?: number;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  filtering,
  paginate,
  actionComponent: ActionComponent,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState | undefined>(
    paginate ? { pageIndex: 0, pageSize: paginate } : undefined
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnFilters = filtering?.getFilters;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(paginate && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
    onSortingChange: setSorting,
    onPaginationChange: paginate
      ? (setPagination as React.Dispatch<React.SetStateAction<PaginationState>>)
      : undefined,
  });

  const PaginationComponent = ({
    pagination,
  }: {
    pagination: PaginationState;
  }) => {
    const pageCount = table.getPageCount();
    const pageIndex = pagination.pageIndex;

    const [curIndexes, setCurIndexes] = useState<number[]>([]);
    const [prevIndexes, setPrevIndexes] = useState<number[]>([]);
    const [nextIndexes, setNextIndexes] = useState<number[]>([]);

    useEffect(() => {
      const newCurIndexes = [];
      const newPrevIndexes = [];
      const newNextIndexes = [];

      if (pageCount <= 3) {
        for (let i = 1; i <= pageCount; i++) {
          newCurIndexes.push(i);
        }
      } else {
        if (pageIndex === 0) {
          newCurIndexes.push(1, 2, 3);
        } else if (pageIndex === pageCount - 1) {
          newCurIndexes.push(pageCount - 2, pageCount - 1, pageCount);
        } else {
          newCurIndexes.push(pageIndex, pageIndex + 1, pageIndex + 2);
        }

        for (let i = 1; i < pageIndex - 1; i++) {
          newPrevIndexes.push(i);
        }

        for (let i = pageIndex + 3; i <= pageCount; i++) {
          newNextIndexes.push(i);
        }
      }

      setCurIndexes(newCurIndexes);
      setPrevIndexes(newPrevIndexes);
      setNextIndexes(newNextIndexes);
    }, [pageIndex, pageCount]);

    return (
      <Pagination>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-nowrap">
            Exibindo <strong>{table.getRowModel().rows?.length}</strong> de{" "}
            <strong>{data.length}</strong>{" "}
            registros.
          </p>
          <div>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <PaginationPrevious />
                </Button>
              </PaginationItem>
              {prevIndexes.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <PaginationItem>
                      <Button variant="ghost" className="p-1">
                        <PaginationEllipsis />
                      </Button>
                    </PaginationItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={cn("min-w-5")}>
                    <ScrollArea>
                      <div
                        className={`max-h-52 ${
                          prevIndexes.length > 5 && "mr-2"
                        }`}
                      >
                        {prevIndexes.map((item) => (
                          <DropdownMenuItem
                            key={item}
                            className="justify-center p-0"
                          >
                            <Button
                              variant="ghost"
                              onClick={() => table.setPageIndex(item - 1)}
                              className="p-4"
                            >
                              {item}
                            </Button>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div>
                {curIndexes.map((item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    onClick={() => table.setPageIndex(item - 1)}
                    className={
                      pageIndex === item - 1
                        ? "border rounded-lg transform ease-linear"
                        : ""
                    }
                  >
                    <PaginationItem>{item}</PaginationItem>
                  </Button>
                ))}
              </div>
              {nextIndexes.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <PaginationItem>
                      <Button variant="ghost" className="p-1">
                        <PaginationEllipsis />
                      </Button>
                    </PaginationItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={cn("min-w-5")}>
                    <ScrollArea>
                      <div
                        className={`max-h-52 ${
                          nextIndexes.length > 5 && "mr-2"
                        }`}
                      >
                        {nextIndexes.map((item) => (
                          <DropdownMenuItem
                            key={item}
                            className="justify-center p-0"
                          >
                            <Button
                              variant="ghost"
                              onClick={() => table.setPageIndex(item - 1)}
                              className="p-4 rounded-lg"
                            >
                              {item}
                            </Button>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <PaginationItem>
                <Button
                  variant="ghost"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <PaginationNext />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </div>
        </div>
      </Pagination>
    );
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full grid grid-cols-2 ${
          filtering || ActionComponent ? "mb-2" : ""
        }`}
      >
        <div className="flex gap-1">
          {filtering &&
            filtering.componentFilters &&
            filtering.componentFilters.map((ItemComponent, idx) => (
              <ItemComponent key={idx} />
            ))}
        </div>
        <div className="relative ml-auto">
          {ActionComponent && <ActionComponent />}
        </div>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-custom-dark-blue">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="rounded">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-100/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginate && pagination && (
        <div className="mt-2">
          <PaginationComponent pagination={pagination} />
        </div>
      )}
    </div>
  );
}
