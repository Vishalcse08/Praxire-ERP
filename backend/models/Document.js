const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['aadhar', 'pan', 'passport', 'certificate', 'other'], required: true },
  fileUrl: { type: String, required: true }, // URL or path to the uploaded file
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
