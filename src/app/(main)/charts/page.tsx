"use client";

import { useMonthlyExpenses } from "./useMonthlyExpenses";
import { getExpenseTypeNames } from "../../models/expense";
import { BarChart } from "@/components/ui/charts/bar-chart/bar-chart";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";
import { Metadata } from "next";

export default function Page() {
  const { typeExpenses, luxuryExpenses } = useMonthlyExpenses();

  return (
    <PageWrapper>
      <TypographyH2 className="mb-6">Expenses</TypographyH2>
      <BarChart
        type={"stacked"}
        data={typeExpenses}
        index="month"
        categories={getExpenseTypeNames()}
        showLegend={false}
        className="mb-4"
      />
      <TypographyH2 className="my-6">Luxury Expenses</TypographyH2>
      <BarChart
        type={"stacked"}
        data={luxuryExpenses}
        index="month"
        categories={["1", "2", "3"]}
        colors={["green", "yellow", "red"]}
        showLegend={false}
        className="mb-4"
      />
    </PageWrapper>
  );
}
