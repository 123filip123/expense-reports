import { EXPENSE_TYPE, IExpense } from "@/app/models/expense";
import { getExpenseTypeName } from "@/libs/helpers/expense-helpers";
import { ColumnDef } from "@tanstack/react-table";
import { Key } from "react";

export const columns: ColumnDef<IExpense>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "expense_type",
    header: "Type",
    cell: (cell) => getExpenseTypeName(cell.getValue() as number),
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row: { original } }) => (
      <div className="text-right">{original.amount * original.price}</div>
    ),
  },

  {
    accessorKey: "date",
    header: "Date",
  },
];

export const renderCell = (expense: IExpense, columnKey: Key) => {
  const cellValue = expense[columnKey.toString()];

  switch (columnKey) {
    case "expense_type":
      return EXPENSE_TYPE[cellValue as keyof typeof EXPENSE_TYPE];
    default:
      return cellValue;
  }
};
