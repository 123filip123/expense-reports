import { EXPENSE_TYPE } from "@/app/models/expense";
import { format } from "date-fns";
import { z } from "zod";

export const addExpenseSchema = z.object({
  expense_name: z.string().min(1, "Name is required"),
  type: z.number(),
  price: z.number().min(0, "Price must be a positive number"),
  amount: z.number().min(1, "Amount must be at least 1"),
  bought_from: z.string().optional(),
  date: z.string().optional(),
  is_subscription: z.boolean().optional(),
  luxury_level: z.number().min(1).max(3, "Luxury rating must be 1, 2, or 3"),
  weight: z.number().optional(),
  protein_per_100g: z.number().optional(),
});

export interface IAddExpenseFormInput {
  expense_name: string;
  expense_type: -1 | EXPENSE_TYPE;
  price: string;
  amount: string;
  bought_from: string;
  date: string; // string formatted in the ISO 8601 format (YYYY-MM-DD)
  is_subscription: boolean;
  weight: string;
  protein_per_100g: string;
  luxury_rating: number;
}

export const addExpensesFormDefaultValues = {
  expense_name: "",
  expense_type: -1,
  price: "",
  amount: "1",
  bought_from: "",
  date: format(new Date(), "yyyy-MM-dd"),
  is_subscription: false,
  weight: "",
  protein_per_100g: "",
  luxury_rating: 1,
};

export const addExpensesFormValidationSchema = z.object({
  expense_name: z.string().nonempty(),
  expense_type: z.number().int().min(1),
  price: z.string().nonempty(),
  amount: z.string().nonempty(),
  bought_from: z.string(),
  date: z.string().nonempty(),
  is_subscription: z.boolean(),
  weight: z.string(),
  protein_per_100g: z.string(),
  luxury_rating: z.number().int().min(1).max(3),
});
