const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenditureSchema = new Schema({
  financialType: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  budgetId: { type: Schema.Types.ObjectId, required: true },
});



module.exports = mongoose.model("Expenditres", expenditureSchema);
