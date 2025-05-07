const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

mongoose.connect('mongodb://localhost:27017/tehrice').then(async () => {
  const exists = await User.findOne({ phone: '123' });
  if (exists) return console.log('SuperAdmin already exists');

  const hashed = await bcrypt.hash('123', 10);
  const superAdmin = new User({
    name: 'Super Admin',
    phone: '123',
    password: hashed,
    role: 'SuperAdmin'
  });

  await superAdmin.save();
  console.log('✅ SuperAdmin seeded');
  process.exit(0);
});
