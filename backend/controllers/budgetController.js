import Budget from "../models/budgetModel.js";

const addBudget = async (req, res) => {
  const userId = req.user._id;
  const { year, month, amount } = req.body;

  try {
    let userBudget = await Budget.findOne({ userId });

    if (!userBudget) {
      userBudget = new Budget({
        userId,
        budgets: [{ year, month, amount }],
      });
    } else {
      const existingBudgetIndex = userBudget.budgets.findIndex(
        (entry) => entry.year === year && entry.month === month
      );

      if (existingBudgetIndex !== -1) {
        userBudget.budgets[existingBudgetIndex].amount = amount;
      } else {
        userBudget.budgets.push({ year, month, amount });
      }
    }

    await userBudget.save();
    const budget = userBudget.budgets;

    return res
      .status(200)
      .json({ message: "Budget added successfully", budget });
  } catch (error) {
    console.error("Error adding budget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBudget = async (req, res) => {
  try {
    const userId = req.user._id;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const userBudget = await Budget.findOne({
      userId,
      "budgets.year": year,
      "budgets.month": month,
    });
    if (userBudget) {
      const currentMonthBudget = userBudget.budgets.find(
        (entry) => entry.year === year && entry.month === month
      );
      return res.status(200).json({
        message: "Current month budget found",
        currentMonthBudget,
      });
    } else {
      return res.status(200).json({
        message: "No budget found for the current month",
        currentMonthBudget: null,
      });
    }
  } catch (error) {
    console.error("Error retrieving current month budget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export { addBudget, getBudget };
