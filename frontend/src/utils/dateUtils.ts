import {
  AggExpenseByMonth,
  AggIncomeByMonth,
  MonthlyTransaction,
  TimeFrame,
} from "../types";
import { TimeFrames } from "./const";

export const dateToMMMDD = (date: Date): string => {
  const newDate = new Date(date).toDateString().slice(4, 10);
  return newDate;
};

export const combineFinancialData = (
  expenses: AggExpenseByMonth[],
  incomes: AggIncomeByMonth[]
): MonthlyTransaction[] => {
  const monthlyData: { [key: string]: MonthlyTransaction } = {};

  const getMonthKey = (month: number, year: number) => {
    const date = new Date(year, month - 1); // month - 1 because months are 0-based in JS
    const monthName = date.toLocaleString("default", { month: "short" });
    return `${year}-${month}`; // Use this as key to maintain chronological order
  };

  expenses.forEach((expense) => {
    const key = getMonthKey(expense.month, expense.year);
    const monthName = new Date(expense.year, expense.month - 1).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlyData[key]) {
      monthlyData[key] = {
        month: monthName,
        income: 0,
        expense: 0,
      };
    }
    monthlyData[key].expense = expense.totalExpenses;
  });

  incomes.forEach((income) => {
    const key = getMonthKey(income.month, income.year);
    const monthName = new Date(income.year, income.month - 1).toLocaleString(
      "default",
      { month: "short" }
    );

    if (!monthlyData[key]) {
      monthlyData[key] = {
        month: monthName,
        income: 0,
        expense: 0,
      };
    }
    monthlyData[key].income = income.totalIncomes;
  });

  return Object.entries(monthlyData)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([_, data]) => data);
};

export const getDateRange = (timeFrameKey: string): TimeFrame => {
  const now = new Date();
  switch (timeFrameKey) {
    case TimeFrames.THIS_MONTH:
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
        endDate: new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        ).toISOString(),
      };
    case TimeFrames.LAST_MONTH:
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        ).toISOString(),
        endDate: new Date(now.getFullYear(), now.getMonth(), 0).toISOString(),
      };
    case TimeFrames.LAST_3_MONTHS:
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth() - 2,
          1
        ).toISOString(),
        endDate: now.toISOString(),
      };
    case TimeFrames.LAST_6_MONTHS:
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth() - 5,
          1
        ).toISOString(),
        endDate: now.toISOString(),
      };
    case TimeFrames.THIS_YEAR:
      return {
        startDate: new Date(now.getFullYear(), 0, 1).toISOString(),
        endDate: now.toISOString(),
      };
    default:
      throw new Error("Invalid time frame");
  }
};
