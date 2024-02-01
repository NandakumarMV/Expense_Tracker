import React, { useEffect, useState } from "react";
import ExpenseFrom from "./ExpenseFrom";
import {
  useDeleteExpenseMutation,
  useGetExpenseMutation,
  useGetMonthlyExpenseMutation,
} from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { expenseRemove, setExpenses } from "../slices/expenseSlice";
import { dateFormat } from "../utils/dateFormat";
import { MdDelete } from "react-icons/md";
import useMonthlyExpense from "../utils/getExpOfMonth";
import WarningModal from "./WarningModal";

const Expenses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [getExpenses] = useGetExpenseMutation();
  const [removeExpense] = useDeleteExpenseMutation();
  const [monthExpense] = useGetMonthlyExpenseMutation();
  const dispatch = useDispatch();

  const getExpenseData = async () => {
    const res = await getExpenses().unwrap();
    dispatch(setExpenses(res));
  };

  const { getExpOfMonth } = useMonthlyExpense();

  useEffect(() => {
    getExpenseData();
    getExpOfMonth();
  }, [currentPage]);

  const expenses = useSelector((state) => state.expenses.expense);
  const monthlyExp = useSelector((state) => state.expenses.expenseOfMonth);
  const deleteExpense = async (expId) => {
    try {
      const res = await removeExpense({ expId }).unwrap();

      if (res.message !== "Expense not found") {
        await dispatch(expenseRemove({ expId }));
        getExpOfMonth();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(expenses.length / pageSize);
  const handlePagination = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastExpense = currentPage * pageSize;
  const indexOfFirstExpense = indexOfLastExpense - pageSize;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );
  
  return (
    <div>
      <div className="w-full border-2 border-black bg-slate-100 p-5 text-red-700 font-bold rounded-xl text-xl font-mono flex justify-center items-center">
        Total Expense : ₹ {monthlyExp}
      </div>
      <div className="flex justify-end items-start">
        <ExpenseFrom />
        <div className="p-6">
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={`mx-1 px-3 py-1 ${
                  currentPage === index + 1 ? "bg-gray-400" : "bg-gray-200"
                } hover:bg-gray-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {currentExpenses.map((exp) => (
            <div
              key={exp._id}
              className="mt-2 bg-slate-50 mx-4 drop-shadow-lg h-fit hover:bg-slate-100 hover:shadow-2xl"
            >
              <div className="p-3 h-full flex flex-col w-full">
                <div className="text-lg text-blue-700">
                  {exp?.title.toUpperCase()}
                </div>
                <div className="mx-2">
                  <div className="flex space-x-2 justify-between">
                    <p className="font-medium"> ₹ {exp?.amount}</p>
                    <p>{dateFormat(exp?.date)}</p>
                    <p>{exp?.category.toUpperCase()}</p>
                    <MdDelete
                      className="text-lg"
                      onClick={(e) => deleteExpense(exp._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Expenses;
