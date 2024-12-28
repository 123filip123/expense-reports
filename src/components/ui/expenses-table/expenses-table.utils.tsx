import { EXPENSE_TYPE, IExpense } from "@/app/models/expense";
import { Key } from "react";

export const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "expense_type",
    label: "Type",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "amount",
    label: "Amount",
  },
  {
    key: "bought_from",
    label: "Bought From",
  },
  {
    key: "date",
    label: "Date",
  },
  {
    key: "luxury_rating",
    label: "Luxury Rating",
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
