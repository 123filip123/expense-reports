import { IExpense } from "@/app/models/expense";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { useExpenses } from "./useExpenses";
import { columns } from "./expenses-table.utils";

interface IExpensesTableProps {
  currentPage: number;
  totalPages: number;
  setTotalCount: Dispatch<SetStateAction<number>>;
}

export const useExpensesTable = ({
  totalPages,
  currentPage,
  setTotalCount,
}: IExpensesTableProps) => {
  const { expenses, loading } = useExpenses(currentPage, setTotalCount);

  const table = useReactTable<IExpense>({
    data: expenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: totalPages,
    rowCount: ITEMS_PER_PAGE,
    manualPagination: true,
  });

  return { table, loading };
};
