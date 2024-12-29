"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EXPENSE_TYPE, EXPENSE_TYPES_ARRAY } from "@/app/models/expense";
import { ErrorMessage } from "../form/error-message/error-message";
import {
  addExpensesFormDefaultValues,
  addExpensesFormValidationSchema,
  IAddExpenseFormInput,
  resetFormAndValues,
  setStringValueToNumber,
} from "./add-expenses-form.form";
import {
  addExpenseRequest,
  formatStringOnlyDigits,
} from "./add-expenses-form.utils";
import { useRouter } from "next/navigation";

export const AddExpensesForm = () => {
  const router = useRouter();
  const todaysDate = today(getLocalTimeZone());

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: addExpensesFormDefaultValues,
    resolver: zodResolver(addExpensesFormValidationSchema),
  });

  const expense_type = watch("expense_type");

  const onSubmit = async (data: IAddExpenseFormInput) => {
    try {
      await addExpenseRequest(data);

      router.push("/expenses");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleSecondaryButtonPress = async () => {
    handleSubmit(async (data: IAddExpenseFormInput) => {
      try {
        await addExpenseRequest(data);

        resetFormAndValues(data, reset);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    })();
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2 items-center max-w-xs">
          <div className="flex flex-col w-full">
            <Controller
              name="expense_name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Name"
                  id="expense_name"
                  variant="bordered"
                  {...field}
                />
              )}
            />
            {errors.expense_name && (
              <ErrorMessage>Please enter a name.</ErrorMessage>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Select
              items={EXPENSE_TYPES_ARRAY}
              label="Expense type"
              placeholder="Select a type"
              id="expense_type"
              variant="bordered"
              value={expense_type}
              onChange={(e) => {
                setValue(
                  "expense_type",
                  Number(e.target.value) as EXPENSE_TYPE,
                  {
                    shouldValidate: true,
                  }
                );
              }}
            >
              {(type) => <SelectItem>{type.name}</SelectItem>}
            </Select>
            {errors.expense_type && (
              <ErrorMessage>Please select an expense type.</ErrorMessage>
            )}
          </div>
          <div className="flex gap-x-2 w-full">
            <div className="flex flex-col">
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Price"
                    id="price"
                    variant="bordered"
                    {...field}
                    onChange={(e) =>
                      setStringValueToNumber(e.target.value, "price", setValue)
                    }
                  />
                )}
              />
              {errors.price && (
                <ErrorMessage>Please enter a price.</ErrorMessage>
              )}
            </div>
            <div className="flex flex-col max-w-16">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Amount"
                    id="amount"
                    variant="underlined"
                    defaultValue="1"
                    className="max-w-16"
                    {...field}
                    onChange={(e) =>
                      setStringValueToNumber(e.target.value, "amount", setValue)
                    }
                  />
                )}
              />
              {errors.amount && (
                <ErrorMessage>Please enter an amount.</ErrorMessage>
              )}
            </div>
          </div>
          <Controller
            name="bought_from"
            control={control}
            render={({ field }) => (
              <Input
                label="Bought From"
                id="bought_from"
                variant="bordered"
                {...field}
              />
            )}
          />
          <DatePicker
            label="Date"
            id="date"
            disableAnimation
            variant="bordered"
            defaultValue={todaysDate}
            onChange={(date) => {
              setValue("date", date?.toString() ?? "", {
                shouldValidate: true,
              });
            }}
          />
          <div className="flex items-center gap-x-6">
            <div className="flex flex-col items-center gap-x-2">
              <Controller
                name="luxury_rating"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Luxury rating"
                    id="luxury_rating"
                    variant="underlined"
                    defaultValue="1"
                    className="max-w-16"
                    value={field.value.toString()}
                    onChange={(e) => {
                      const value = formatStringOnlyDigits(e.target.value);
                      const parsedValue = parseInt(value);
                      setValue("luxury_rating", parsedValue, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
              {errors.luxury_rating && (
                <ErrorMessage>Luxury rating must be 1, 2, or 3.</ErrorMessage>
              )}
            </div>
          </div>
          {/* Wrapping the button in div because the parent div with flex causes the button to stretch */}
          <div className="mt-2 flex gap-x-2">
            <Button color="primary" type="submit">
              Add Expense
            </Button>
            <Button color="secondary" onPress={handleSecondaryButtonPress}>
              Add and start new expense
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
