import {
  ArrowLineLeft,
  ArrowLineRight,
  DotsThree,
  PushPinSlash,
} from "@phosphor-icons/react"
import type {
  Column,
  ColumnDef,
  Table as ReactTable,
} from "@tanstack/react-table"
import { flexRender } from "@tanstack/react-table"
import { type CSSProperties } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData> {
  table: ReactTable<TData>
  columns: ColumnDef<TData>[]
}

export function DataTable<TData>({ table, columns }: DataTableProps<TData>) {
  const getPinningStyles = (column: Column<TData>): CSSProperties => {
    const isPinned = column.getIsPinned()
    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    }
  }

  return (
    <div className="border-table-body overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="overflow-hidden rounded-t-lg">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-table-header hover:bg-table-header"
            >
              {headerGroup.headers.map((header) => {
                const { column } = header
                const isPinned = column.getIsPinned()
                const isLastLeftPinned =
                  isPinned === "left" && column.getIsLastColumn("left")
                const isFirstRightPinned =
                  isPinned === "right" && column.getIsFirstColumn("right")

                return (
                  <TableHead
                    key={header.id}
                    className="[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 relative h-10 truncate border-t data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l"
                    colSpan={header.colSpan}
                    style={{ ...getPinningStyles(column) }}
                    data-pinned={isPinned || undefined}
                    data-last-col={
                      isLastLeftPinned
                        ? "left"
                        : isFirstRightPinned
                          ? "right"
                          : undefined
                    }
                  >
                    <div className="flex items-center justify-between gap-2 font-semibold text-white">
                      <span className="truncate">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </span>
                      {!header.isPlaceholder &&
                        header.column.getCanPin() &&
                        (header.column.getIsPinned() ? (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="-mr-1 size-7 shadow-none"
                            onClick={() => header.column.pin(false)}
                            aria-label={`Unpin ${header.column.columnDef.header as string} column`}
                            title={`Unpin ${header.column.columnDef.header as string} column`}
                          >
                            <PushPinSlash
                              className="opacity-60"
                              weight="bold"
                              size={16}
                              aria-hidden="true"
                            />
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="-mr-1 size-7 shadow-none"
                                aria-label={`Pin options for ${header.column.columnDef.header as string} column`}
                                title={`Pin options for ${header.column.columnDef.header as string} column`}
                              >
                                <DotsThree
                                  className="opacity-60"
                                  size={16}
                                  weight="bold"
                                  aria-hidden="true"
                                />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => header.column.pin("left")}
                              >
                                <ArrowLineLeft
                                  size={16}
                                  weight="bold"
                                  className="opacity-60"
                                  aria-hidden="true"
                                />
                                Stick to left
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => header.column.pin("right")}
                              >
                                <ArrowLineRight
                                  weight="bold"
                                  size={16}
                                  className="opacity-60"
                                  aria-hidden="true"
                                />
                                Stick to right
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ))}
                      {header.column.getCanResize() && (
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className:
                              "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
                          }}
                        />
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-table-body">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-table-border"
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell
                  const isPinned = column.getIsPinned()
                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left")
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right")

                  return (
                    <TableCell
                      key={cell.id}
                      className="[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l"
                      style={{ ...getPinningStyles(column) }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                            ? "right"
                            : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
