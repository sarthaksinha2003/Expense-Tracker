const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add income Sources
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const { icon, source, amount, date } = req.body;
    console.log(source, amount);
    // Validation: check for missing field
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All field are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json({ success: true, message: "Income added", newIncome });
  } catch (error) {
    console.error("Add Income Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Income Sources
exports.deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "id not found" });
    }
    await Income.findByIdAndDelete(id);

    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// downloadIncomeExcel Sources
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // format date
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx')
  } catch (error) {
    console.error("Excel Download Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};