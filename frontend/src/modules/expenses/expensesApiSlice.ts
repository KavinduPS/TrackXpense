import { Expense } from "../../types";
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
  }),
});

export const { useGetAllExpensesQuery } = expensesApiSlice;
