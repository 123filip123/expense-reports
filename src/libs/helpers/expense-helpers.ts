import { EXPENSE_TYPE } from "@/app/models/expense";

export const getExpenseTypeName = (expenseType: EXPENSE_TYPE) => {
  return EXPENSE_TYPE[expenseType];
};
