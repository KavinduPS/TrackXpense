import { Goal } from "../../types";
import { apiSlice } from "../api/apiSlice";

const GOALS_URL = "/api/goals";

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllGoals: build.query<Goal[], void>({
      query: () => ({
        url: `${GOALS_URL}`,
        method: "GET",
      }),
      providesTags: ["Goals"],
    }),
    addGoal: build.mutation({
      query: (data) => ({
        url: `${GOALS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Goals"],
    }),
    addSaving: build.mutation({
      query: ({ goalId, amount }) => ({
        url: `${GOALS_URL}/${goalId}`,
        method: "PUT",
        body: { amount },
      }),
      invalidatesTags: ["Goals"],
    }),
    deleteGoal: build.mutation({
      query: (data) => ({
        url: `${GOALS_URL}/${data._id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const {
  useGetAllGoalsQuery,
  useAddGoalMutation,
  useAddSavingMutation,
  useDeleteGoalMutation,
} = goalsApiSlice;
