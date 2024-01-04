// useMonthlyExpense.js

import { useState } from "react";
import { useGetMonthlyExpenseMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { addExpOfMonth } from "../slices/expenseSlice";

const useMonthlyExpense = () => {
  const [monthExpense] = useGetMonthlyExpenseMutation();
  const [expOfMonth, setExpOfMonth] = useState(0);
  const dispatch = useDispatch();

  const getExpOfMonth = async () => {
    try {
      const res = await monthExpense().unwrap();

      dispatch(addExpOfMonth(res.totalExpense));
    } catch (error) {
      console.error("Error fetching monthly expense:", error);
    }
  };

  return { getExpOfMonth };
};

export default useMonthlyExpense;
