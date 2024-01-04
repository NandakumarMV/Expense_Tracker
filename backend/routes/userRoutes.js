import express from "express";
const router = express.Router();
import {
  authUser,
  logOutUser,
  registerUser,
} from "../controllers/userControllers.js";
import {
  addExpense,
  deleteExpense,
  getExpense,
  getMonthlyExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/protect.js";
import { addBudget, getBudget } from "../controllers/budgetController.js";

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logOutUser);

router.post("/add-expense", protect, addExpense);
router.get("/get-expense", protect, getExpense);
router.delete("/delete-expense", protect, deleteExpense);
router.get("/montly-expense", protect, getMonthlyExpense);

router.post("/add-budget", protect, addBudget);
router.get("/get-budget", protect, getBudget);

export default router;
