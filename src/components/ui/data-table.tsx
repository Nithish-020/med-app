import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: keyof T & string;
  header: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  items: T[];
  search?: string;
  pageSize?: number;
  className?: string;
  emptyText?: string;
}

// Lightweight data-table replacement for Vuetify's v-data-table.
// Supports substring search across all string values + client-side pagination.
export function DataTable<T extends object>({
  columns,
  items,
  search = "",
  pageSize = 10,
  className,
  emptyText = "No records found.",
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(0);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((row) =>
      Object.values(row as Record<string, unknown>).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [items, search]);

  React.useEffect(() => {
    setPage(0);
  }, [search, items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead
                key={c.key}
                className={cn(
                  c.align === "center" && "text-center",
                  c.align === "right" && "text-right",
                )}
              >
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((c) => {
                  const v = row[c.key];
                  return (
                    <TableCell
                      key={c.key}
                      className={cn(
                        c.align === "center" && "text-center",
                        c.align === "right" && "text-right",
                      )}
                    >
                      {c.render ? c.render(v, row) : String(v ?? "")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {filtered.length > pageSize && (
        <div className="flex items-center justify-between border-t px-3 py-2 text-sm text-muted-foreground">
          <span>
            Page {safePage + 1} of {totalPages} · {filtered.length} rows
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
