import React, { useState } from "react";
import { useAddBudgetMutation } from "../slices/userApiSlice";
import { addBudgetOfMonth } from "../slices/expenseSlice";
import { useDispatch } from "react-redux";

const BudgetModal = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [addBudget] = useAddBudgetMutation();
  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await addBudget({
        amount,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }).unwrap();

      dispatch(addBudgetOfMonth(res.budget[0].amount));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay fixed inset-0 bg-slate-50 opacity-20 pointer-events-none"></div>
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg pointer-events-auto">
        <h2 className="text-2xl font-bold mb-4">Add Budget of this Month</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              name="amount"
              onChange={handleAmountChange}
              className="mb-4 p-2 w-full border rounded border-black"
            />
          </label>
          {/* Add hidden fields for the current year and month */}
          <input type="hidden" name="year" value={new Date().getFullYear()} />
          <input type="hidden" name="month" value={new Date().getMonth() + 1} />
          <div className="flex space-x-2">
            {" "}
            <button
              type="submit"
              className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 rounded border-black"
            >
              Submit
            </button>
            <button
              className="bg-gray-950 text-white hover:bg-gray-300 hover:text-slate-950 hover:font-bold px-4 py-2 rounded border-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
