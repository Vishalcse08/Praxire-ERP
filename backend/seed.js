const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/praxire-erp');
    
    // Clear existing users
    await User.deleteMany({});

    // Create Founder
    await User.create({
      name: 'Praxire Founder',
      email: 'admin@praxire.com',
      password: 'password123',
      role: 'founder'
    });

    // Create Employee
    await User.create({
      name: 'John Doe',
      email: 'john@praxire.com',
      password: 'password123',
      role: 'employee'
    });

    console.log('Seed successful:');
    console.log('Founder: admin@praxire.com / password123');
    console.log('Employee: john@praxire.com / password123');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
