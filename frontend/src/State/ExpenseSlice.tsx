import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  reference?: string;
};

type ExpenseState = {
  expenses: Expense[];
};

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    editExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
  },
});

export const { addExpense, deleteExpense, editExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
