"use client";

import { buttonVariants } from "@/components/ui/button";
import { ExpensesTable } from "@/components/ui/expenses-table/expenses-table";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";
import { cx } from "@/libs/utils";
import Link from "next/link";

export default function Page() {
  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <TypographyH2 className="my-4 mr-2 flex-grow">Expenses</TypographyH2>
        <Link
          href="/expenses/add"
          className={cx(buttonVariants({ variant: "default" }))}
        >
          Add
        </Link>
      </div>
      <ExpensesTable />
    </PageWrapper>
  );
}
