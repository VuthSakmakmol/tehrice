const bcrypt = require('bcryptjs');
const SuperAdmin = require('../models/SuperAdmin');

module.exports = async () => {
  const existing = await SuperAdmin.findOne({ phone: process.env.SUPER_ADMIN_PHONE });
  if (!existing) {
    const hashed = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);
    await SuperAdmin.create({
      username: process.env.SUPER_ADMIN_USERNAME,
      phone: process.env.SUPER_ADMIN_PHONE,
      password: hashed,
      role: 'SuperAdmin',
      permissions: {
        productMgmt: true,
        userMgmt: true,
        dashboard: true,
        orderMgmt: true,
      },
    });
    console.log('✅ Super Admin seeded successfully');
  } else {
    console.log('ℹ️ Super Admin already exists');
  }
};
