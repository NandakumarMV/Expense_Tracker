import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgets: [
      {
        year: {
          type: Number,
          required: true,
          default: new Date().getFullYear(),
        },
        month: {
          type: Number,
          required: true,
          default: new Date().getMonth() + 1,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
