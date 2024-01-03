import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddExpenseMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { setExpenses } from "../slices/expenseSlice";

const ExpenseFrom = () => {
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

  const [addExpense] = useAddExpenseMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await addExpense(inputState).unwrap();
    console.log(res, "thisssssssssss");
    await dispatch(setExpenses(res));

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
    });
    try {
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-6  w-96">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            name={"title"}
            placeholder="Expense Title"
            className="w-full border border-gray-700  px-3 bg-slate-50 py-2"
            onChange={handleInput("title")}
          />
        </div>
        <div className="mb-4">
          <input
            value={amount}
            type="text"
            name={"amount"}
            placeholder={"Expense Amount"}
            className="w-full border border-gray-600  px-3 bg-slate-50 py-2"
            onChange={handleInput("amount")}
          />
        </div>
        <div className="mb-4">
          <DatePicker
            id="date"
            placeholderText="Enter a Date"
            className=" border border-gray-600  px-3 bg-slate-50 py-2"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
              setInputState({ ...inputState, date: date });
            }}
          />
        </div>
        <div className=" mb-4">
          <select
            required
            value={category}
            name="category"
            id="category"
            onChange={handleInput("category")}
            className=" border border-gray-600  px-3 bg-slate-50 py-2"
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
          className="bg-black text-white py-2 px-4   hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
        >
          Add Expense
        </button>
      </form>
    </>
  );
};

export default ExpenseFrom;
