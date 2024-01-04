import Expense from "../models/expenseModel.js";

const addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  const userId = req.user._id;

  try {
    // Validations
    if (!title || !category || !date || !amount) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }

    const updatedUserExpenses = await Expense.findOneAndUpdate(
      { userId },
      {
        $push: {
          expenses: {
            title,
            amount,
            category,
            date,
          },
        },
      },
      { new: true, upsert: true }
    );

    updatedUserExpenses.expenses.sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json(updatedUserExpenses.expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const userExpenses = await Expense.findOne({ userId }, { expenses: 1 });

    if (!userExpenses) {
      return res.status(404).json({ message: "User expenses not found" });
    }
    userExpenses.expenses.sort((a, b) => b.timestamp - a.timestamp);

    res.status(200).json(userExpenses.expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { expId } = req.body;
    const userId = req.user._id;

    // Find the user's expenses
    const userExpenses = await Expense.findOne({ userId });

    if (!userExpenses) {
      return res.status(404).json({ message: "User expenses not found" });
    }

    // Find the index of the expense with the specified ID
    const expenseIndex = userExpenses.expenses.findIndex(
      (expense) => expense._id.toString() === req.body.expId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }
    // Remove the expense from the expenses array
    userExpenses.expenses.splice(expenseIndex, 1);

    // Save the updated expenses array to the database
    await userExpenses.save();

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getMonthlyExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get the current date
    const currentDate = new Date();

    // Extract the year and month from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed

    // Retrieve expenses for the user
    const userExpenses = await Expense.findOne({ userId }, { expenses: 1 });

    if (!userExpenses) {
      return res.status(404).json({ message: "User expenses not found" });
    }

    const currentMonthExpenses = userExpenses.expenses.filter((expense) => {
      const expenseYear = expense.timestamp.getFullYear();
      const expenseMonth = expense.timestamp.getMonth() + 1;
      return expenseYear === currentYear && expenseMonth === currentMonth;
    });

    const totalExpense = currentMonthExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    res.status(200).json({ totalExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addExpense, getExpense, deleteExpense, getMonthlyExpense };
