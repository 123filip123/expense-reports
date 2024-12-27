export enum EXPENSE_TYPE {
  Food = 1, // green
  Groceries, // dark blue
  Household, // dark yellow
  Utilities, // light blue
  Health, // red
  Clothing, // purple
  Transport, // orange
  Entertainment, // pink
  Travel, // light yellow
  Fitness, // light green
  Other = 99, // grey
}
export const getExpenseTypeNames = (): string[] => {
  return Object.keys(EXPENSE_TYPE).filter((key) => isNaN(Number(key)));
};
export const EXPENSE_TYPES_ARRAY = Object.entries(EXPENSE_TYPE)
  .filter(([, value]) => typeof value === "number")
  .map(([key, value]) => {
    let color: string;
    switch (value) {
      case EXPENSE_TYPE.Food:
        color = "#008000"; // green
        break;
      case EXPENSE_TYPE.Groceries:
        color = "#00008B"; // dark blue
        break;
      case EXPENSE_TYPE.Household:
        color = "#B8860B"; // dark yellow
        break;
      case EXPENSE_TYPE.Utilities:
        color = "#ADD8E6"; // light blue
        break;
      case EXPENSE_TYPE.Health:
        color = "#FF0000"; // red
        break;
      case EXPENSE_TYPE.Clothing:
        color = "#800080"; // purple
        break;
      case EXPENSE_TYPE.Transport:
        color = "#FFA500"; // orange
        break;
      case EXPENSE_TYPE.Entertainment:
        color = "#FFC0CB"; // pink
        break;
      case EXPENSE_TYPE.Travel:
        color = "#FFFFE0"; // light yellow
        break;
      case EXPENSE_TYPE.Fitness:
        color = "#90EE90"; // light green
        break;
      case EXPENSE_TYPE.Other:
        color = "#808080"; // grey
        break;
      default:
        color = "#000000"; // Default color if none matches
    }
    return {
      key: value as number,
      name: key,
      color,
    };
  });

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
