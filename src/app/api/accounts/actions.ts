"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/libs/supabase/server";
import { IAddAccountFormInput } from "@/components/ui/add-account-form/add-account-form";
import { IAccount } from "@/app/models/account";

export const addAccount = async (formData: IAddAccountFormInput) => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log({ userData, userError });

  if (userError || !userData?.user) {
    return;
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const body = {
    name: formData.name,
    user_id: userData?.user?.id,
  };
  const { error } = await supabase.from("accounts").insert(body).select("*");

  revalidatePath("/accounts");

  if (error) {
    redirect("/error");
  }
};

export const getAccounts = async () => {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log({ userData, userError });

  if (userError || !userData?.user) {
    return [];
  }

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userData.user.id);

  if (error) {
    console.error("Error fetching accounts:", error);
    return [];
  }

  return data as IAccount[];
};
