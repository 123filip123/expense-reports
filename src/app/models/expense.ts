export enum EXPENSE_TYPE {
  Food = 1,
  Groceries,
  Household,
  Utilities,
  Health,
  Clothing,
  Transport,
  Entertainment,
  Travel,
  Fitness,
  Other = 99,
}

export const EXPENSE_TYPES_ARRAY = Object.entries(EXPENSE_TYPE)
  .filter(([_, value]) => typeof value === "number")
  .map(([key, value]) => ({
    key: value as number,
    name: key,
  }));

export interface IPostExpenseBody {
  name: string;
  expense_type: EXPENSE_TYPE;
  price: number;
  amount: number;
  bought_from?: string;
  date: string;
  is_subscription: boolean;
  weight?: number;
  protein_per_100g?: number;
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
  is_subscription: boolean;
  weight?: number;
  protein_per_100g?: number;
  luxury_rating?: number;
  created_at: string;
}

export interface IGetExpensesFilters {
  searchName?: string;
  searchBoughtFrom?: string;
  expenseTypeFilter?: EXPENSE_TYPE;
  luxuryRatingFilter?: number;
}
