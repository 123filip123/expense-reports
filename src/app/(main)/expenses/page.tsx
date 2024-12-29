"use client";

import { ExpensesTable } from "@/components/ui/expenses-table/expenses-table";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";

export default function Page() {
  return (
    <PageWrapper>
      <TypographyH2 className="mb-6">Expenses</TypographyH2>
      <ExpensesTable />
    </PageWrapper>
  );
}
