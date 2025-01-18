import { getExpenseTypeNames } from "../../models/expense";
import { BarChart } from "@/components/ui/charts/bar-chart/bar-chart";
import { PageWrapper } from "@/components/ui/page-wrapper/page-wrapper";
import { TypographyH2 } from "@/components/ui/typography/typography-h2";
import { getMonthlyExpenses } from "@/app/api/expenses/actions";

export default async function Page() {
  const { monthlyTypeExpenses, monthlyLuxuryExpenses } =
    await getMonthlyExpenses({ months: 12 });

  return (
    <PageWrapper>
      <div>
        <TypographyH2 className="mb-6">Type Expenses</TypographyH2>
      </div>
      <BarChart
        type={"stacked"}
        data={monthlyTypeExpenses}
        index="month"
        categories={getExpenseTypeNames()}
        showLegend={false}
        className="mb-4"
      />
      <TypographyH2 className="my-6">Luxury Expenses</TypographyH2>
      <BarChart
        type={"stacked"}
        data={monthlyLuxuryExpenses}
        index="month"
        categories={["1", "2", "3"]}
        colors={["green", "yellow", "red"]}
        showLegend={false}
        className="mb-4"
      />
    </PageWrapper>
  );
}
