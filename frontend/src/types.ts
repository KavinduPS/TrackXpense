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

export type AggExpense = {
  _id: string;
  originalDate: string;
  amount: number;
};

export type AggIncome = {
  _id: string;
  originalDate: string;
  amount: number;
};

export type TimeFrame = {
  startDate: string;
  endDate: string;
};
