import {
  AggExpense,
  AggExpenseByMonth,
  CategoryExpenses,
  Expense,
  TimeFrame,
} from "../../types";
import { apiSlice } from "../api/apiSlice";

const EXPENSES_URL = "/api/expenses";

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllExpenses: build.query<Expense[], void>({
      query: () => ({
        url: `${EXPENSES_URL}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getAllExpensesByDate: build.query<AggExpense[], void>({
      query: () => ({
        url: `${EXPENSES_URL}/by-date`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getAllExpensesByMonth: build.query<AggExpenseByMonth[], void>({
      query: () => ({
        url: `${EXPENSES_URL}/by-month`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getAllExpensesByCategory: build.query<CategoryExpenses[], void>({
      query: () => ({
        url: `${EXPENSES_URL}/by-category`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getAllExpensesByDateRange: build.query<AggExpense[], TimeFrame>({
      query: (timeFrame) => ({
        url: `${EXPENSES_URL}/date-range`,
        method: "GET",
        params: timeFrame,
      }),
      providesTags: ["Expenses"],
    }),
    addExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSES_URL}/${data._id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetAllExpensesByDateQuery,
  useGetAllExpensesByMonthQuery,
  useGetAllExpensesByCategoryQuery,
  useLazyGetAllExpensesByDateRangeQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;
