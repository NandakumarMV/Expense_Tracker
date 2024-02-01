import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddExpenseMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setExpenses } from "../slices/expenseSlice";
import useMonthlyExpense from "../utils/getExpOfMonth";
import WarningModal from "./WarningModal";

const ExpenseFrom = () => {
  const [showWarningModal, setShowWarningModal] = useState(false);

  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const { title, amount, date, category } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const { getExpOfMonth } = useMonthlyExpense();

  const [addExpense] = useAddExpenseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("lllllllllllllll");
    const res = await addExpense(inputState).unwrap();
    console.log(res.message, "resss from backkk");

    if (res.message === "Expense exceeds the budget for the current month!") {
      setShowWarningModal(true);
    } else {
      await dispatch(setExpenses(res));
      getExpOfMonth();
    }
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
    });
  };
  const handleCloseWarningModal = () => {
    setShowWarningModal(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            name={"title"}
            placeholder="Expense Title"
            className="w-full border border-gray-700 px-3 bg-slate-50 py-2"
            onChange={handleInput("title")}
          />
        </div>
        <div className="mb-4">
          <input
            value={amount}
            type="text"
            name={"amount"}
            placeholder={"Expense Amount"}
            className="w-full border border-gray-600 px-3 bg-slate-50 py-2"
            onChange={handleInput("amount")}
          />
        </div>
        <div className="mb-4">
          <DatePicker
            id="date"
            placeholderText="Enter a Date"
            className="w-full border border-gray-600 px-3 bg-slate-50 py-2"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
          />
        </div>
        <div className="mb-4">
          <select
            required
            value={category}
            name="category"
            id="category"
            onChange={handleInput("category")}
            className="w-full border border-gray-600 px-3 bg-slate-50 py-2"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="food">Food</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300 w-full"
        >
          Add Expense
        </button>
      </form>
      {showWarningModal && <WarningModal onClose={handleCloseWarningModal} />}
    </>
  );
};

export default ExpenseFrom;
