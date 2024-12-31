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
import { EXPENSE_TYPE, EXPENSE_TYPES_ARRAY } from "@/app/models/expense";
import { FieldError, UseFormSetValue } from "react-hook-form";
import { IAddExpensesDefaultValues } from "./add-expenses-form.form";
import { ErrorMessage } from "../form/error-message/error-message";

interface IExpenseTypeSelectProps {
  setValue: UseFormSetValue<IAddExpensesDefaultValues>;
  fieldError?: FieldError;
}

export const ExpenseTypeSelect = ({
  setValue,
  fieldError,
}: IExpenseTypeSelectProps) => {
  return (
    <div className="w-full">
      <Select
        onValueChange={(value) => {
          setValue("expense_type", Number(value) as EXPENSE_TYPE, {
            shouldValidate: true,
          });
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Expense type</SelectLabel>
            {EXPENSE_TYPES_ARRAY.map((expenseType) => (
              <SelectItem
                key={expenseType.key}
                value={expenseType.key.toString()}
              >
                {expenseType.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {fieldError && (
        <ErrorMessage>Please select an expense type.</ErrorMessage>
      )}
    </div>
  );
};
