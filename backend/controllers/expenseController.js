const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense Sources
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const { icon, category, amount, date } = req.body;
    // Validation: check for missing field
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All field are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json({ success: true, message: "Expense added", newExpense });
  } catch (error) {
    console.error("Add expense Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Expense Sources
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Expense Sources
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "id not found" });
    }
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// downloadExpenseExcel Sources
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // format date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, 'expense_details.xlsx');
    res.download('expense_details.xlsx')
  } catch (error) {
    console.error("Excel Download Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};