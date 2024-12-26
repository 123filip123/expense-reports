"use client";

import { useMonthlyExpenses } from "./useMonthlyExpenses";
import { getExpenseTypeNames } from "../models/expense";
import { BarChart } from "@/components/ui/charts/bar-chart/bar-chart";

export default function Page() {
  const { typeExpenses, luxuryExpenses, loading } = useMonthlyExpenses();

  return (
    <div>
      <h2 className="text-lg font-semibold">Expense Types</h2>
      <BarChart
        type={"stacked"}
        className="h-52"
        data={typeExpenses}
        index="month"
        categories={getExpenseTypeNames()}
        showLegend={false}
      />
      <h2 className="text-lg font-semibold">Luxury Types</h2>
      <BarChart
        type={"stacked"}
        className="h-52"
        data={luxuryExpenses}
        index="month"
        categories={["1", "2", "3"]}
        colors={["green", "yellow", "red"]}
        showLegend={false}
      />
    </div>
  );
}
