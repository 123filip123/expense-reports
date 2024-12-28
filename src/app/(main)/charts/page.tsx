"use client";

import { useMonthlyExpenses } from "./useMonthlyExpenses";
import { getExpenseTypeNames } from "../../models/expense";
import { BarChart } from "@/components/ui/charts/bar-chart/bar-chart";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";

export default function Page() {
  const { typeExpenses, luxuryExpenses } = useMonthlyExpenses();

  return (
    <PageWrapper>
      <h2 className="text-lg font-semibold my-4">Expense Types</h2>
      <BarChart
        type={"stacked"}
        data={typeExpenses}
        index="month"
        categories={getExpenseTypeNames()}
        showLegend={false}
        className="mb-4"
      />

      <h2 className="text-lg font-semibold my-4">Luxury Types</h2>
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
