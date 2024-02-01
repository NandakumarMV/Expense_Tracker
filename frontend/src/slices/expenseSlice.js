import { counter } from "@fortawesome/fontawesome-svg-core";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense: [],
  expenseOfMonth: 0,
  budgetOfMonth: 0,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expense = action.payload;
    },
    expenseRemove: (state, action) => {
      const { expId } = action.payload;

      state.expense = state.expense.filter((expense) => expense._id !== expId);
    },
    addExpOfMonth: (state, action) => {
      state.expenseOfMonth = action.payload;
    },
    addBudgetOfMonth: (state, action) => {
      state.budgetOfMonth = action.payload;
    },
  },
});

export const {
  setExpenses,
  expenseRemove,
  addExpOfMonth,
  addBudgetOfMonth,
  incrementCounter,
  decrementCounter,
} = expenseSlice.actions;

export default expenseSlice.reducer;
