import { EXPENSE_TYPE } from "@/app/models/expense";
import { formatStringOnlyDigits } from "@/utils";
import { format } from "date-fns";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { z } from "zod";

export const addExpenseSchema = z.object({
  expense_name: z.string().min(1, "Name is required"),
  type: z.number(),
  price: z.number().min(0, "Price must be a positive number"),
  amount: z.number().min(1, "Amount must be at least 1"),
  bought_from: z.string().optional(),
  date: z.string().optional(),
  luxury_level: z.number().min(1).max(3, "Luxury rating must be 1, 2, or 3"),
});

export interface IAddExpenseFormInput {
  expense_name: string;
  expense_type: -1 | EXPENSE_TYPE;
  price: string;
  amount: string;
  bought_from: string;
  date: string; // string formatted in the ISO 8601 format (YYYY-MM-DD)
  luxury_rating: number;
}

interface IAddExpensesDefaultValues {
  expense_name: string;
  expense_type: number;
  price: string;
  amount: string;
  bought_from: string;
  date: string;
  luxury_rating: number;
}

export const addExpensesFormDefaultValues = {
  expense_name: "",
  expense_type: -1,
  price: "",
  amount: "1",
  bought_from: "",
  date: format(new Date(), "yyyy-MM-dd"),
  luxury_rating: 1,
};

export const addExpensesFormValidationSchema = z.object({
  expense_name: z.string().nonempty(),
  expense_type: z.number().int().min(1),
  price: z.string().nonempty(),
  amount: z.string().nonempty(),
  bought_from: z.string(),
  date: z.string().nonempty(),
  luxury_rating: z.number().int().min(1).max(3),
});

export const resetFormAndValues = (
  data: IAddExpenseFormInput,
  reset: UseFormReset<IAddExpensesDefaultValues>
) => {
  const defaultValues = {
    ...addExpensesFormDefaultValues,
    bought_from: data.bought_from,
    date: data.date,
    expense_type: data.expense_type,
  };
  reset(defaultValues);
};

type FieldName = keyof IAddExpenseFormInput;

export const setStringValueToNumber = (
  str: string,
  fieldName: FieldName,
  setValue: UseFormSetValue<IAddExpensesDefaultValues>
) => {
  const value = formatStringOnlyDigits(str);
  setValue(fieldName, value, {
    shouldValidate: true,
  });
};
