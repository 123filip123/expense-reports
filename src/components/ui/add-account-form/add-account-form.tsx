"use client";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { Input } from "../input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorMessage } from "../form/error-message/error-message";
import { addAccount } from "@/app/api/accounts/actions";

interface IAddAccountDefaultValues {
  name: string;
}

const addAccountFormDefaultValues: IAddAccountDefaultValues = {
  name: "",
};

export interface IAddAccountFormInput {
  name: string;
}

const addAccountFormValidationSchema = z.object({
  name: z.string().nonempty(),
});

export const AddAccountForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: addAccountFormDefaultValues,
    resolver: zodResolver(addAccountFormValidationSchema),
  });
  return (
    <form onSubmit={handleSubmit(addAccount)}>
      <div className="flex">
        <Input
          id="name"
          placeholder="New account name"
          className="mr-2"
          {...register("name")}
        />
        <Button className="self-end" type="submit">
          Add Account
        </Button>
      </div>
      <ErrorMessage>{errors.name?.message}</ErrorMessage>
    </form>
  );
};
