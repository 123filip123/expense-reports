import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/ui/login-form/login-form";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user && !error) {
    redirect("/");
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full my-20">
        <LoginForm />
      </div>
    </PageWrapper>
  );
}
