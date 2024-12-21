import { IPostExpenseBody } from "@/app/models/expense";
import { supabase } from "@/libs/supabaseClient";

export const postExpense = async (body: IPostExpenseBody) => {
  const { data: result, error } = await supabase
    .from("expenses")
    .insert(body)
    .select("*");

  return { result, error };
};
