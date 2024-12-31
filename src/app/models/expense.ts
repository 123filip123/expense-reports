export enum EXPENSE_TYPE {
  Food = 1,
  Groceries,
  Health,
  Clothing,
  Utilities,
  Entertainment,
  Fitness,
  Household,
  Transport,
  Travel,
  Other = 99,
}
export const getExpenseTypeNames = (): string[] => {
  return Object.keys(EXPENSE_TYPE).filter((key) => isNaN(Number(key)));
};
export const EXPENSE_TYPES_ARRAY = Object.entries(EXPENSE_TYPE)
  .filter(([, value]) => typeof value === "number")
  .map(([key, value]) => {
    return {
      key: value as number,
      name: key,
    };
  });

export interface IPostExpenseBody {
  name: string;
  expense_type: EXPENSE_TYPE;
  price: number;
  amount: number;
  bought_from?: string;
  date: Date;
  luxury_rating?: number;
}

export interface IExpense {
  id: number;
  name: string;
  date: string;
  expense_type: EXPENSE_TYPE;
  price: number;
  amount: number;
  bought_from?: string;
  luxury_rating?: number;
  created_at: string;
  [key: string]: number | string | boolean | undefined;
}

export interface IGetExpensesFilters {
  searchName?: string;
  searchBoughtFrom?: string;
  expenseTypeFilter?: EXPENSE_TYPE;
  luxuryRatingFilter?: number;
}

export interface IMonthlyTypeExpenses {
  month: string; // e.g., "Jan 24"
  [expenseType: string]: number | string; // Dynamic keys for expense types with total spent
}

export interface IMonthlyLuxuryExpenses {
  month: string; // e.g., "Jan 24"
  [luxuryRating: string]: number | string; // Dynamic keys for expense types with total spent
}

export interface IMonthlyExpenses {
  month: string; // e.g., "Jan 24"
  expense_types: { [key: number]: number }; // Expense type ID to total spent
  luxury_ratings: { [key: number]: number }; // Luxury rating to total spent
}
