import {
  EXPENSE_TYPE,
  IMonthlyExpenses,
  IMonthlyLuxuryExpenses,
  IMonthlyTypeExpenses,
} from "@/app/models/expense";

export const mapExpenseTypeToName = (expenseType: number): string => {
  switch (expenseType) {
    case EXPENSE_TYPE.Food:
      return "Food";
    case EXPENSE_TYPE.Groceries:
      return "Groceries";
    case EXPENSE_TYPE.Household:
      return "Household";
    case EXPENSE_TYPE.Utilities:
      return "Utilities";
    case EXPENSE_TYPE.Health:
      return "Health";
    case EXPENSE_TYPE.Clothing:
      return "Clothing";
    case EXPENSE_TYPE.Transport:
      return "Transport";
    case EXPENSE_TYPE.Entertainment:
      return "Entertainment";
    case EXPENSE_TYPE.Travel:
      return "Travel";
    case EXPENSE_TYPE.Fitness:
      return "Fitness";
    case EXPENSE_TYPE.Other:
      return "Other";
    default:
      return "Unknown";
  }
};

// Function to transform the data from SQL result
export const transformExpensesData = (
  data: IMonthlyExpenses[]
): {
  transformedTypes: IMonthlyLuxuryExpenses[];
  transformedLuxury: IMonthlyTypeExpenses[];
} => {
  const transformedTypesArray: IMonthlyLuxuryExpenses[] = [];
  const transformedLuxuryArray: IMonthlyTypeExpenses[] = [];

  data.forEach((item) => {
    const transformedTypes: IMonthlyLuxuryExpenses = {
      month: item.month,
    };

    const transformedLuxury: IMonthlyTypeExpenses = {
      month: item.month,
    };

    // Convert the numeric expense type keys to their names for 'types'
    Object.keys(item.expense_types).forEach((key) => {
      const typeName = mapExpenseTypeToName(parseInt(key, 10)); // Convert the key to a number and map it
      transformedTypes[typeName] =
        item.expense_types[key as unknown as keyof typeof item.expense_types];
    });

    // Convert the numeric expense type keys to their names for 'luxury'
    Object.keys(item.luxury_ratings).forEach((key: string) => {
      transformedLuxury[key] =
        item.luxury_ratings[key as unknown as keyof typeof item.luxury_ratings];
    });

    transformedTypesArray.push(transformedTypes);
    transformedLuxuryArray.push(transformedLuxury);
  });

  return {
    transformedTypes: transformedTypesArray,
    transformedLuxury: transformedLuxuryArray,
  };
};
