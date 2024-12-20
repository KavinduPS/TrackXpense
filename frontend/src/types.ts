export type Expense = {
  _id?: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  reference?: string;
};

export type Income = {
  _id?: string;
  name: string;
  amount: number;
  date: string;
  source: string;
  description?: string;
};

export type Goal = {
  _id?: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
};

export type AggExpense = {
  _id: string;
  originalDate: string;
  amount: number;
};

export type AggExpenseByMonth = {
  totalExpenses: number;
  month: number;
  year?: number;
};

export type AggIncome = {
  _id: string;
  originalDate: string;
  amount: number;
};

export type AggIncomeByMonth = {
  totalIncomes: number;
  month: number;
  year?: number;
};

export type MonthlyTransaction = {
  month: string;
  income: number;
  expense: number;
};

export type TimeFrame = {
  startDate: string;
  endDate: string;
};
