"use client";

import { login } from "@/app/login/actions";
import { useForm } from "react-hook-form";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";

interface ILoginInitialValues {
  email: string;
  password: string;
}
const loginInitialValues: ILoginInitialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = useForm({ defaultValues: loginInitialValues });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
      </div>
      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
        Log in
      </Button>
      {/* <Button variant="secondary" formAction={signup}>
      Sign up
    </Button> */}
    </form>
  );
};
