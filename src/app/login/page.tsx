import { Input } from "@/components/ui/input";
import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (data?.user && !error) {
    redirect("/");
  }

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-full my-20">
        <form className="flex flex-col gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" name="email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <Button formAction={login}>Log in</Button>
          {/* <Button variant="secondary" formAction={signup}>
            Sign up
          </Button> */}
        </form>
      </div>
    </PageWrapper>
  );
}
