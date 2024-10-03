const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['debit', 'credit'], required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  circleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Circle' },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);