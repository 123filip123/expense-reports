import { EXPENSE_TYPE, IExpense, IPostExpenseBody } from "@/app/models/expense";
import { supabase } from "@/libs/supabase/client";
import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

// Utility function to generate random integers within a range
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Utility function to pick a random item from an array
const getRandomItem = <T>(array: T[]): T =>
  array[getRandomInt(0, array.length - 1)];

// Categories with weighted probability for realistic distribution
const expenseCategories: { type: EXPENSE_TYPE; weight: number }[] = [
  { type: EXPENSE_TYPE.Food, weight: 25 },
  { type: EXPENSE_TYPE.Groceries, weight: 20 },
  { type: EXPENSE_TYPE.Utilities, weight: 15 },
  { type: EXPENSE_TYPE.Transport, weight: 10 },
  { type: EXPENSE_TYPE.Entertainment, weight: 8 },
  { type: EXPENSE_TYPE.Health, weight: 7 },
  { type: EXPENSE_TYPE.Household, weight: 6 },
  { type: EXPENSE_TYPE.Fitness, weight: 4 },
  { type: EXPENSE_TYPE.Clothing, weight: 3 },
  { type: EXPENSE_TYPE.Travel, weight: 1 },
  { type: EXPENSE_TYPE.Other, weight: 1 },
];

// Generate weighted random expense type
const getRandomExpenseType = (): EXPENSE_TYPE => {
  const totalWeight = expenseCategories.reduce(
    (sum, cat) => sum + cat.weight,
    0
  );
  const random = Math.random() * totalWeight;
  let weightSum = 0;
  for (const category of expenseCategories) {
    weightSum += category.weight;
    if (random <= weightSum) return category.type;
  }
  return EXPENSE_TYPE.Other; // Fallback
};

// Seed function
const seedExpenses = (): IPostExpenseBody[] => {
  const expenses: IPostExpenseBody[] = [];
  const currentDate = new Date();

  // Generate data for the last 12 months
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const monthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthOffset
    );
    const totalMonthlySpending = getRandomInt(20000, 45000);
    let remainingBudget = totalMonthlySpending;

    while (remainingBudget > 0) {
      const price = getRandomInt(500, Math.min(remainingBudget, 5000));
      const amount = getRandomInt(1, 5);
      const expenseType = getRandomExpenseType();

      const expense: IPostExpenseBody = {
        name: `${EXPENSE_TYPE[expenseType]} Purchase`,
        date: new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          getRandomInt(1, 28) // Avoid invalid dates like Feb 30
        ).toISOString(),
        expense_type: expenseType,
        price: price,
        amount: amount,
        bought_from: getRandomItem([
          "Amazon",
          "Local Store",
          "Supermarket",
          "Online",
        ]),
        luxury_rating: getRandomInt(1, 3),
      };

      expenses.push(expense);
      remainingBudget -= price;
    }
  }

  return expenses;
};

// Generate seed data

export async function GET() {
  try {
    const supabase = await createClient();

    const seedData = seedExpenses();

    const { data, error } = await supabase.from("expenses").insert(seedData);

    if (error) {
      console.log("Error seeding expenses:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
