import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/login");
};
