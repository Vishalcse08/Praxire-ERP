const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);

module.exports = router;
