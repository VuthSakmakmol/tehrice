const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminId: { type: String, unique: true },
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  permissions: {
    productMgmt: Boolean,
    userMgmt: Boolean,
    dashboard: Boolean,
    orderMgmt: Boolean,
  },
  createdBy: String,
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
