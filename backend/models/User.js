const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  graduationYear: String,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'founder'], default: 'employee' },
  
  // Personal Details
  phone: String,
  address: String,
  emergencyContact: String,

  // Professional Details
  education: [educationSchema],
  skills: [String],
  
  // Salary Details
  salary: { type: Number, default: 0 },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    bankName: String
  }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
