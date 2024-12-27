"use client";

import { ExpensesTable } from "@/components/ui/expenses-table/expenses-table";
import { PageHeading } from "@/components/ui/page-heading/page-heading";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";

export default function Page() {
  return (
    <PageWrapper>
      <PageHeading>Expenses main page</PageHeading>
      <ExpensesTable />
    </PageWrapper>
  );
}
