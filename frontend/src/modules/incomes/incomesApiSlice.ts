import { AggIncome, AggIncomeByMonth, Income, TimeFrame } from "../../types";
import { apiSlice } from "../api/apiSlice";

const INCOMES_URL = "/api/incomes";

export const incomesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllIncomes: build.query<Income[], void>({
      query: () => ({
        url: `${INCOMES_URL}`,
        method: "GET",
      }),
      providesTags: ["Incomes"],
    }),
    getAllIncomesByDate: build.query<AggIncome[], void>({
      query: () => ({
        url: `${INCOMES_URL}/by-date`,
        method: "GET",
      }),
      providesTags: ["Incomes"],
    }),
    getAllIncomesByMonth: build.query<AggIncomeByMonth[], void>({
      query: () => ({
        url: `${INCOMES_URL}/by-month`,
        method: "GET",
      }),
      providesTags: ["Incomes"],
    }),
    getAllincomesByDateRange: build.query<AggIncome[], TimeFrame>({
      query: (timeFrame) => ({
        url: `${INCOMES_URL}/date-range`,
        method: "GET",
        params: timeFrame,
      }),
      providesTags: ["Incomes"],
    }),
    addIncome: build.mutation({
      query: (data) => ({
        url: `${INCOMES_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Incomes"],
    }),
    updateIncome: build.mutation({
      query: (data) => ({
        url: `${INCOMES_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Incomes"],
    }),
    deleteIncome: build.mutation({
      query: (data) => ({
        url: `${INCOMES_URL}/${data._id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Incomes"],
    }),
  }),
});

export const {
  useGetAllIncomesQuery,
  useGetAllIncomesByDateQuery,
  useGetAllIncomesByMonthQuery,
  useLazyGetAllincomesByDateRangeQuery,
  useAddIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomesApiSlice;
