import {
  IExpense,
  IGetExpensesFilters,
  IPostExpenseBody,
} from "@/app/models/expense";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import { supabase } from "@/libs/supabaseClient";

export const postExpense = async (body: IPostExpenseBody) => {
  const { data, error } = await supabase
    .from("expenses")
    .insert(body)
    .select("*");

  return { data, error };
};

export const getExpenses = async (currentPage: number) => {
  // Calculate the range for the current page
  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  // Fetch data from the expenses table with pagination
  const { data, error, count } = await supabase
    .from("expenses")
    .select("*", { count: "exact" }) // Fetch the total row count
    .order("date", { ascending: false }) // Order by date, starting with the newest
    .order("id", { ascending: false })
    .range(from, to); // Specify the range for pagination

  return { data: (data ?? []) as IExpense[], error, count: count ?? 0 };
};
