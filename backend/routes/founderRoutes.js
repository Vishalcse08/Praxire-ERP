const express = require('express');
const router = express.Router();
const { getEmployees, getEmployeeById, updateEmployeeSalary, setFinance, getFinances } = require('../controllers/founderController');
const { protect, founderOnly } = require('../middleware/authMiddleware');

router.use(protect, founderOnly);

router.route('/employees').get(getEmployees);
router.route('/employees/:id').get(getEmployeeById);
router.route('/employees/:id/salary').put(updateEmployeeSalary);

router.route('/finance').post(setFinance).get(getFinances);

module.exports = router;
