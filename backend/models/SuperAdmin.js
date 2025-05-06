const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^0[1-9][0-9]{7,8}$/ // Cambodian mobile number: starts with 0 and has 9-10 digits
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'SuperAdmin',
    enum: ['SuperAdmin']
  },
  permissions: {
    type: Map,
    of: Boolean,
    default: {
      productMgmt: true,
      userMgmt: true,
      dashboard: true,
      orderMgmt: true,
      smsConfig: true,
      systemSettings: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
