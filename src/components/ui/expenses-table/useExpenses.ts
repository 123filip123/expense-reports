import { getExpenses } from "@/app/api/expenses/expenses.api";
import { IExpense } from "@/app/models/expense";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const useExpenses = (
  currentPage: number,
  setTotalCount: Dispatch<SetStateAction<number>>
) => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);

    try {
      // Fetch data from the expenses table with pagination
      const { data, error, count } = await getExpenses(currentPage);

      if (error) {
        console.error("Error fetching expenses:", error.message);
        return;
      }

      // Update state with fetched data and total row count
      console.log(data);
      setExpenses(data);
      setTotalCount(count);
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, setTotalCount]);

  return { expenses, loading, fetchExpenses };
};
