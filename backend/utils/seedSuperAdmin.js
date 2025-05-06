const mongoose = require('mongoose');
const User = require('../models/User'); // ✅ Adjusted path to go up one level
require('dotenv').config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');

    const phone = '123';
    const existing = await User.findOne({ phone });

    if (existing) {
      console.log('⚠️  SuperAdmin already exists.');
    } else {
      const superAdmin = new User({
        name: 'Super Admin',
        phone,
        password: '123',
        role: 'SuperAdmin'
      });

      await superAdmin.save();
      console.log('✅ SuperAdmin created successfully:', phone);
    }
  } catch (err) {
    console.error('❌ Error seeding SuperAdmin:', err.message);
  } finally {
    mongoose.disconnect();
    process.exit();
  }
};

seedSuperAdmin();
