export type Expense = {
  name: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
};

export type Income = {
  name: string;
  amount: number;
  date: Date;
  source: string;
  description?: string;
};
