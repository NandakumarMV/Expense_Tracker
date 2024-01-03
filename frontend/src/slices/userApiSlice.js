import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "post",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-expense`,
        method: "POST",
        body: data,
      }),
    }),
    getExpense: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/get-expense`,
        method: "get",
        body: data,
      }),
    }),
    getMonthlyExpense: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/montly-expense`,
        method: "get",
        body: data,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete-expense`,
        method: "delete",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseMutation,
  useGetMonthlyExpenseMutation,
} = userApiSlice;
