import { Income } from "../../types";
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
  }),
});

export const { useGetAllIncoemsQuery } = incomesApiSlice;
