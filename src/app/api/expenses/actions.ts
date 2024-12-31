"use server";
import { EXPENSE_TYPE, IPostExpenseBody } from "@/app/models/expense";
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
