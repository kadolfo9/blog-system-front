"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Body,
  Cell,
  Head,
  Header,
  Root,
  Row,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <>
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar Titulos..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button size="sm" appearance="primary" className="ml-2 mt-2" onClick={() => navigate("/posts/create")}>Nova Publicação</Button>
        </div>

        <div className="rounded-md border">
          <Root>
            <Header>
              {table.getHeaderGroups().map((headerGroup) => (
                <Row key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Head key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </Head>
                    )
                  })}
                </Row>
              ))}
            </Header>
            <Body>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Row
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Cell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Cell>
                    ))}
                  </Row>
                ))
              ) : (
                <Row>
                  <Cell colSpan={columns.length} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </Cell>
                </Row>
              )}
            </Body>
          </Root>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            appearance="ghost"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            appearance="ghost"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </>
  )
}