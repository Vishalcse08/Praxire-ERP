const User = require('../models/User');
const Finance = require('../models/Finance');

// @desc Get all employees
// @route GET /api/founder/employees
const getEmployees = async (req, res) => {
  const employees = await User.find({ role: 'employee' }).select('-password');
  res.json(employees);
};

// @desc Get single employee details
// @route GET /api/founder/employees/:id
const getEmployeeById = async (req, res) => {
  const employee = await User.findById(req.params.id).select('-password');
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// @desc Update employee salary
// @route PUT /api/founder/employees/:id/salary
const updateEmployeeSalary = async (req, res) => {
  const employee = await User.findById(req.params.id);
  if (employee) {
    employee.salary = req.body.salary || employee.salary;
    const updated = await employee.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// @desc Process Monthly Finance
// @route POST /api/founder/finance
const setFinance = async (req, res) => {
  const { month, revenue, spends, target } = req.body;
  const finance = await Finance.findOneAndUpdate(
    { month },
    { revenue, spends, target },
    { new: true, upsert: true }
  );
  res.json(finance);
};

// @desc Get All Finances
// @route GET /api/founder/finance
const getFinances = async (req, res) => {
  const finances = await Finance.find().sort({ createdAt: 1 });
  res.json(finances);
};

module.exports = { getEmployees, getEmployeeById, updateEmployeeSalary, setFinance, getFinances };
