"use client";

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { columns, renderCell } from "./expenses-table.utils";
import { useExpenses } from "./useExpenses";
import { usePagination } from "@/libs/hooks/usePagination";

export const ExpensesTable = () => {
  const { currentPage, setTotalCount, totalPages, setCurrentPage } =
    usePagination();
  const { expenses, loading } = useExpenses(currentPage, setTotalCount);
  return (
    <>
      <Table
        aria-label="Example table with dynamic content"
        isStriped
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={currentPage}
              total={totalPages}
              onChange={setCurrentPage}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={expenses} isLoading={loading}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
