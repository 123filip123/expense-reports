import { AddExpensesForm } from "@/components/ui/add-expenses-form/add-expenses-form";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";

export default async function Page() {
  return (
    <div>
      <TypographyH2 className="my-6">Add Expenses</TypographyH2>
      <AddExpensesForm />
    </div>
  );
}
