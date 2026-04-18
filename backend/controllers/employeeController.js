const User = require('../models/User');

// @desc Update employee personal profile
// @route PUT /api/employee/profile
const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.emergencyContact = req.body.emergencyContact || user.emergencyContact;
    user.skills = req.body.skills || user.skills;
    
    // Support adding education
    if (req.body.education) {
      user.education = req.body.education;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { updateProfile };
