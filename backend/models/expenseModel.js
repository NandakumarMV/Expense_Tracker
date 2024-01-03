import mongoose, { Mongoose } from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expenses: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          maxLength: 50,
        },
        amount: {
          type: Number,
          required: true,
          maxLength: 20,
          trim: true,
        },
        type: {
          type: String,
          default: "expense",
        },
        date: {
          type: Date,
          required: true,
          trim: true,
        },
        category: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
