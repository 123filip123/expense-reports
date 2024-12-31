import { getAccounts } from "@/app/api/accounts/actions";
import { AddExpensesForm } from "@/components/ui/add-expenses-form/add-expenses-form";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";

export default async function Page() {
  const accounts = await getAccounts();

  return (
    <div>
      <TypographyH2 className="my-6">Add Expenses</TypographyH2>
      <AddExpensesForm accounts={accounts} />
    </div>
  );
}
