import { getMonthlyExpenses } from "@/app/api/expenses/expenses.api";

import { useCallback, useEffect, useState } from "react";
import {
  IMonthlyLuxuryExpenses,
  IMonthlyTypeExpenses,
} from "@/app/models/expense";
import { transformExpensesData } from "./utils";

export const useMonthlyExpenses = () => {
  const [typeExpenses, setTypeExpenses] = useState<IMonthlyTypeExpenses[]>([]);
  const [luxuryExpenses, setLuxuryExpenses] = useState<
    IMonthlyLuxuryExpenses[]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchMonthlyExpenses = useCallback(async () => {
    setLoading(true);

    try {
      const { data, error } = await getMonthlyExpenses();

      if (error) {
        console.error("Error fetching monthly expenses:", error.message);
        return;
      }

      const { transformedTypes, transformedLuxury } =
        transformExpensesData(data);
      setTypeExpenses(transformedTypes);
      setLuxuryExpenses(transformedLuxury);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [fetchMonthlyExpenses]);

  return { typeExpenses, luxuryExpenses, loading };
};
