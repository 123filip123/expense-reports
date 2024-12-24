import { EXPENSE_TYPE } from "@/app/models/expense";
import { Key } from "react";

// Add index signature to IExpense
interface IExpense {
  [key: string]: any;
}

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
    key: "weight",
    label: "Weight",
  },
  {
    key: "protein_per_100g",
    label: "Protein per 100g",
  },
  {
    key: "luxury_rating",
    label: "Luxury Rating",
  },
  {
    key: "is_subscription",
    label: "Subscription",
  },
];

export const renderCell = (expense: IExpense, columnKey: Key) => {
  const cellValue = expense[columnKey as string];

  switch (columnKey) {
    case "expense_type":
      EXPENSE_TYPE[cellValue];
      return EXPENSE_TYPE[cellValue];
    case "is_subscription":
      return cellValue ? "Yes" : "No";
    default:
      return cellValue;
  }
};
