"use server";
import {
  EXPENSE_TYPE,
  IExpense,
  IGetMonthlyExpensesParams,
  IMonthlyLuxuryExpenses,
  IMonthlyTypeExpenses,
  IPostExpenseBody,
} from "@/app/models/expense";
import { IAddExpenseFormInput } from "@/components/ui/add-expenses-form/add-expenses-form.form";
import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addExpense = async (formData: IAddExpenseFormInput) => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log({ userData, userError });

  if (userError || !userData?.user) {
    return { error: "User not found" };
  }

  const body: IPostExpenseBody = {
    name: formData.expense_name,
    expense_type:
      formData.expense_type === -1 ? EXPENSE_TYPE.Other : formData.expense_type,
    price: parseFloat(formData.price),
    amount: parseInt(formData.amount),
    bought_from: formData.bought_from,
    date: formData.date ?? new Date(),
    luxury_rating: Number(formData.luxury_rating) ?? 1,
    account_id: formData.account_id,
    user_id: userData?.user?.id,
  };

  const { data, error } = await supabase
    .from("expenses")
    .insert(body)
    .select("*");

  revalidatePath("/expenses");
  revalidatePath("/charts");

  if (error) {
    redirect("/error");
  }

  return { data, error };
};

export const getMonthlyExpenses = async ({
  months,
  account_id,
}: IGetMonthlyExpensesParams) => {
  const supabase = await createClient();
  let query = supabase.from("expenses").select("*");

  if (months !== undefined) {
    const fromDate = new Date(
      new Date().setMonth(new Date().getMonth() - months)
    ).toISOString();
    query = query.gte("date", fromDate);
  }

  if (account_id) {
    query = query.eq("account_id", account_id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }

  return generateMonthlyExpenses(data as IExpense[]);
};

const generateMonthlyExpenses = (
  expenses: IExpense[]
): {
  monthlyTypeExpenses: IMonthlyTypeExpenses[];
  monthlyLuxuryExpenses: IMonthlyLuxuryExpenses[];
} => {
  const typeExpensesMap: Record<string, Record<string, number>> = {};
  const luxuryExpensesMap: Record<string, Record<string, number>> = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    const monthKey = `${month} ${year}`;

    // Get the expense type name from the enum
    const expenseTypeName = EXPENSE_TYPE[expense.expense_type];

    // Update type-based expenses
    if (!typeExpensesMap[monthKey]) {
      typeExpensesMap[monthKey] = {};
    }
    typeExpensesMap[monthKey][expenseTypeName] =
      (typeExpensesMap[monthKey][expenseTypeName] || 0) + expense.price;

    // Update luxury-rating-based expenses
    if (expense.luxury_rating !== undefined) {
      const luxuryKey = expense.luxury_rating.toString();
      if (!luxuryExpensesMap[monthKey]) {
        luxuryExpensesMap[monthKey] = {};
      }
      luxuryExpensesMap[monthKey][luxuryKey] =
        (luxuryExpensesMap[monthKey][luxuryKey] || 0) + expense.price;
    }
  });

  // Convert the maps to arrays
  const monthlyTypeExpenses: IMonthlyTypeExpenses[] = Object.entries(
    typeExpensesMap
  ).map(([month, expenses]) => ({
    month,
    ...expenses,
  }));

  const monthlyLuxuryExpenses: IMonthlyLuxuryExpenses[] = Object.entries(
    luxuryExpensesMap
  ).map(([month, expenses]) => ({
    month,
    ...expenses,
  }));

  return { monthlyTypeExpenses, monthlyLuxuryExpenses };
};
