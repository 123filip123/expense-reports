import { cn } from "@/lib/utils";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../calendar";
import { UseFormSetValue } from "react-hook-form";
import { IAddExpensesDefaultValues } from "./add-expenses-form.form";

interface IExpenseDatePickerProps {
  fieldValue: Date | undefined;
  setValues: UseFormSetValue<IAddExpensesDefaultValues>;
}

export const ExpenseDatePicker = ({
  fieldValue,
  setValues,
}: IExpenseDatePickerProps) => {
  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !fieldValue && "text-muted-foreground"
            )}
          >
            {fieldValue ? format(fieldValue, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fieldValue}
            onSelect={(date) =>
              setValues("date", date, {
                shouldValidate: true,
              })
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
