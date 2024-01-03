import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expense = action.payload;
    },
    expenseRemove: (state, action) => {
      console.log(action.payload, "actionnnnn");
      const { expId } = action.payload;
      console.log(expId, "from stklsdjfsdf");

      state.expense = state.expense.filter((expense) => expense._id !== expId);
    },
  },
});

export const { setExpenses, expenseRemove } = expenseSlice.actions;

export default expenseSlice.reducer;
