"use client";

import { getLocalTimeZone, today } from "@internationalized/date";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatStringOnlyDigits } from "@/utils";
import { EXPENSE_TYPE, EXPENSE_TYPES_ARRAY } from "@/app/models/expense";
import { ErrorMessage } from "../form/error-message/error-message";
import {
  addExpensesFormDefaultValues,
  addExpensesFormValidationSchema,
  IAddExpenseFormInput,
} from "./add-expenses-form.form";
import { addExpenseRequest } from "./add-expenses-form.utils";

export const AddExpensesForm = () => {
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

  const onRatingChange = (value: number) => {
    setValue("luxury_rating", value, { shouldValidate: true });
  };

  const onSubmit = async (data: IAddExpenseFormInput) => {
    try {
      await addExpenseRequest(data);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleSecondaryButtonPress = async () => {
    handleSubmit(async (data: IAddExpenseFormInput) => {
      try {
        await addExpenseRequest(data);

        // TODO: Reset the form
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
                    onChange={(e) => {
                      const value = formatStringOnlyDigits(e.target.value);
                      setValue("price", value, {
                        shouldValidate: true,
                      });
                    }}
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
                    onChange={(e) => {
                      const value = formatStringOnlyDigits(e.target.value);
                      setValue("amount", value, {
                        shouldValidate: true,
                      });
                    }}
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
            <Checkbox
              id="is_subscription"
              color="default"
              className="text-xs"
              onChange={(e) => {
                setValue("is_subscription", e.target.checked, {
                  shouldValidate: true,
                });
              }}
            >
              Is Subscription?
            </Checkbox>
            <div className="flex flex-col items-center gap-x-2">
              <p className="text-sm">Luxury rating</p>
              <Rating
                iconsCount={3}
                initialValue={1}
                SVGstyle={{ display: "inline-block" }}
                showTooltip={false}
                onClick={(_, index) => onRatingChange(index + 1)}
              />
            </div>
          </div>
          {expense_type === EXPENSE_TYPE.Food && (
            <div className="flex items-center gap-x-2 w-full">
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Weight"
                    id="weight"
                    variant="bordered"
                    className="max-w-xs"
                    {...field}
                    onChange={(e) => {
                      const value = formatStringOnlyDigits(e.target.value);
                      setValue("weight", value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
              <Controller
                name="protein_per_100g"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Protein per 100g"
                    id="protein_per_100g"
                    variant="bordered"
                    className="max-w-xs"
                    {...field}
                    onChange={(e) => {
                      const value = formatStringOnlyDigits(e.target.value);
                      setValue("protein_per_100g", value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                )}
              />
            </div>
          )}
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
