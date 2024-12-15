import { AggIncome, Income } from "../../types";
import { apiSlice } from "../api/apiSlice";

const INCOMES_URL = "/api/incomes";

export const incomesApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllIncoems: build.query<Income[], void>({
      query: () => ({
        url: `${INCOMES_URL}`,
        method: "GET",
      }),
    }),
    getAllIncomesByDate: build.query<AggIncome[], void>({
      query: () => ({
        url: `${INCOMES_URL}/by-date`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllIncoemsQuery, useGetAllIncomesByDateQuery } =
  incomesApiSlice;
