const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g., '2026-04'
  revenue: { type: Number, required: true, default: 0 },
  spends: { type: Number, required: true, default: 0 },
  target: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Finance', financeSchema);
