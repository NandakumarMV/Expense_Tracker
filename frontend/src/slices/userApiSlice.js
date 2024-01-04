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
      query: () => ({
        url: `${USERS_URL}/montly-expense`,
        method: "get",
      }),
    }),
    deleteExpense: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/delete-expense`,
        method: "delete",
        body: data,
      }),
    }),
    addBudget: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-budget`,
        method: "POST",
        body: data,
      }),
    }),
    getMonthlyBudget: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-budget`,
        method: "get",
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
  useAddBudgetMutation,
  useGetMonthlyBudgetMutation,
} = userApiSlice;
