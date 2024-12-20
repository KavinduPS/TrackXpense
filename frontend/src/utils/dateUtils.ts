import {
  AggExpenseByMonth,
  AggIncomeByMonth,
  MonthlyTransaction,
  TimeFrame,
} from "../types";
import { MONTHS, TimeFrames } from "./const";

export const dateToMMMDD = (date: Date): string => {
  const newDate = new Date(date).toDateString().slice(4, 10);
  return newDate;
};

export const combineFinancialData = (
  expenses: AggExpenseByMonth[],
  incomes: AggIncomeByMonth[]
): MonthlyTransaction[] => {
  const monthlyData = MONTHS.map((month, index) => ({
    month,
    monthIndex: index,
    income: 0,
    expense: 0,
  }));

  expenses.forEach((expense) => {
    const monthIndex = expense.month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyData[monthIndex].expense = expense.totalExpenses;
    }
  });

  incomes.forEach((income) => {
    const monthIndex = income.month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyData[monthIndex].income = income.totalIncomes;
    }
  });

  return monthlyData;
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
