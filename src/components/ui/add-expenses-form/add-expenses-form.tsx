"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "../form/error-message/error-message";
import {
  addExpensesFormDefaultValues,
  addExpensesFormValidationSchema,
  IAddExpenseFormInput,
  resetFormAndValues,
} from "./add-expenses-form.form";
import { Button as ButtonCN } from "@/components/ui/button";
import { addExpenseRequest } from "./add-expenses-form.utils";
import { Input as InputCN } from "@/components/ui/input";
import { ExpenseTypeSelect } from "./expense-type-select";
import { ExpenseDatePicker } from "./expense-date-picker";

export const AddExpensesForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    register,
    reset,
  } = useForm({
    defaultValues: addExpensesFormDefaultValues,
    resolver: zodResolver(addExpensesFormValidationSchema),
  });

  const date = watch("date");

  const onSubmit = async (data: IAddExpenseFormInput) => {
    try {
      await addExpenseRequest(data);

      resetFormAndValues(data, reset);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2 items-center max-w-xs">
          <InputCN
            id="expense_name"
            placeholder="Name"
            {...register("expense_name")}
          />
          {errors.expense_name && (
            <ErrorMessage>Please enter a name.</ErrorMessage>
          )}
          <ExpenseTypeSelect
            setValue={setValue}
            fieldError={errors.expense_type}
          />
          <div className="flex gap-x-2 w-full">
            <div className="flex flex-col">
              <InputCN
                id="price"
                type="number"
                placeholder="Price"
                {...register("price")}
              />
              {errors.price && (
                <ErrorMessage>Please enter a price.</ErrorMessage>
              )}
            </div>
            <div className="flex flex-col">
              <InputCN id="amount" type="number" {...register("amount")} />
              {errors.amount && (
                <ErrorMessage>Please enter an amount.</ErrorMessage>
              )}
            </div>
          </div>
          <InputCN
            id="bought_from"
            placeholder="Bought From"
            {...register("bought_from")}
          />
          <div className="flex">
            <ExpenseDatePicker fieldValue={date} setValues={setValue} />
            <div className="flex flex-col">
              <InputCN
                id="luxury_rating"
                type="number"
                {...register("luxury_rating")}
              />
              {errors.luxury_rating && (
                <ErrorMessage>
                  Please enter a rating between 1 and 3.
                </ErrorMessage>
              )}
            </div>
          </div>
          <ButtonCN type="submit" className="w-full">
            Add Expense
          </ButtonCN>
        </div>
      </form>
    </div>
  );
};
