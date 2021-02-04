const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  budgetName: { type: String, required: true },
  initailAmount: { type: Number, required: true },
  endDate: { type: String, required: true },
  monthlyIncome: { type: Number },
  userId: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Budgets", budgetSchema);
