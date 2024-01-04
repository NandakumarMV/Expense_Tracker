import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import BudgetModal from "./BudgetModal";
import { useGetMonthlyBudgetMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addBudgetOfMonth } from "../slices/expenseSlice";
import useMonthlyExpense from "../utils/getExpOfMonth";

const DashBoard = () => {
  const [monthBudget] = useGetMonthlyBudgetMutation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getExpOfMonth } = useMonthlyExpense();
  const getBudget = async () => {
    const res = await monthBudget().unwrap();
    console.log(res.currentMonthBudget.amount, "res.currentMonthBudget.amount");
    dispatch(addBudgetOfMonth(res.currentMonthBudget.amount));
  };

  useEffect(() => {
    getBudget();
    getExpOfMonth();
  }, []);

  const budget = useSelector((state) => state.expenses.budgetOfMonth);
  const monthlyExp = useSelector((state) => state.expenses.expenseOfMonth);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className=" flex flex-col space-x-5 justify-center items-center">
      <div className="">
        <Graph budgetAmount={budget} totalExpenseAmount={monthlyExp} />
      </div>
      <div className=" flex space-x-8">
        <div className="bg-white border-2 rounded-2xl lg:text-3xl md:text-xl sm:text-lg border-slate-200 shadow-xl text-red-700 font-bold font-mono  flex items-center justify-center  h-20 p-4">
          Total Expense : ₹ {monthlyExp}
        </div>
        <div>
          <div className="bg-white border-2 rounded-2xl lg:text-3xl md:text-xl sm:text-lg border-slate-200 shadow-xl flex text-blue-800 font-bold font-mono items-center justify-center  h-20 p-4">
            Total Budget : ₹ {budget}
          </div>
          <div>
            <button
              className="bg-blue-600 text-white sm:text-sm sm:py-1 sm:px-1 py-2 px-4 mt-5   hover:bg-white hover:text-black  transition duration-300"
              onClick={openModal}
            >
              Add or Change budget of this month
            </button>
            {isModalOpen && <BudgetModal onClose={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
