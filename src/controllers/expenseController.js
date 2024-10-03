const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, type, circleId } = req.body;
    const expense = await Expense.create({ amount, description, type, userId: req.user._id, circleId });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const { startDate, endDate, type, circleId } = req.query;
    let query = { userId: req.user._id };
    if (startDate) query.date = { $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (type) query.type = type;
    if (circleId) query.circleId = circleId;
    const expenses = await Expense.find(query);
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
