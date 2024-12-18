import { EXPENSE_TYPE, IAddExpenseBody } from "@/app/models/expense";
import { IAddExpenseFormInput } from "./add-expenses-form.form";
import { supabase } from "@/libs/supabaseClient";

export const addExpenseRequest = async (data: IAddExpenseFormInput) => {
  const body: IAddExpenseBody = {
    name: data.expense_name,
    expense_type:
      data.expense_type === -1 ? EXPENSE_TYPE.Other : data.expense_type,
    price: parseFloat(data.price),
    amount: parseInt(data.amount),
    bought_from: data.bought_from,
    date: data.date,
    is_subscription: data.is_subscription,
    ...(data.expense_type === EXPENSE_TYPE.Food && {
      weight: data.weight ? parseFloat(data.weight) : undefined,
      protein_per_100g: data.protein_per_100g
        ? parseFloat(data.protein_per_100g)
        : undefined,
    }),
    luxury_rating: data.luxury_rating,
  };

  const { data: result, error } = await supabase
    .from("expenses")
    .insert(body)
    .select("*");

  if (error) {
    console.error("Error inserting expense:", error.message);
    return;
  }

  console.log("Expense added successfully:", result);
};
