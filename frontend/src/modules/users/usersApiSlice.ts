  import { apiSlice } from "../api/apiSlice";
  const USERS_URL = "/api/users";
  
  export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/login`,
          method: "POST",
          body: data,
        }),
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: "POST",
          body: data,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: "POST",
        }),
      }),
      changePassword: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/change-password`,
          method: "POST",
          body: data,
        }),
      }),
    }),
  });
  
  export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useChangePasswordMutation } =
    usersApiSlice;
  
