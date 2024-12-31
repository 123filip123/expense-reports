import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { IAddExpensesDefaultValues } from "./add-expenses-form.form";
import { ErrorMessage } from "../form/error-message/error-message";
import { IAccount } from "@/app/models/account";

interface IAccountSelectProps {
  setValue: UseFormSetValue<IAddExpensesDefaultValues>;
  fieldError?: FieldError;
  accounts: IAccount[];
}

export const AccountSelect = ({
  setValue,
  fieldError,
  accounts,
}: IAccountSelectProps) => {
  return (
    <div className="w-full mb-2">
      <Select
        onValueChange={(value) => {
          setValue("account_id", value, {
            shouldValidate: true,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an account" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Accounts</SelectLabel>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldError && <ErrorMessage>Please select an account.</ErrorMessage>}
    </div>
  );
};
