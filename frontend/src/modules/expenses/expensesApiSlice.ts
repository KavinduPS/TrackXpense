import { AggExpense, Expense } from "../../types";
import { apiSlice } from "../api/apiSlice";

const EXPENSES_URL = "/api/expenses";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllExpenses: build.query<Expense[], void>({
      query: () => ({
        url: `${EXPENSES_URL}`,
        method: "GET",
      }),
    }),
    getAllExpensesByDate: build.query<AggExpense[], void>({
      query: () => ({
        url: `${EXPENSES_URL}/by-date`,
        method: "GET",
      }),
    }),
    addExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetAllExpensesByDateQuery,
  useAddExpenseMutation,
} = expensesApiSlice;
