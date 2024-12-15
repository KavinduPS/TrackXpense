export type Expense = {
  name: string;
  amount: number;
  date: string;
  category: string;
  reference?: string;
};

export type Income = {
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
