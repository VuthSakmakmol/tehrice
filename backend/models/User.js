const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'delivery', 'customer'],
    required: true,
    lowercase: true
  },

  permissions: {
    type: Object,
    default: {
      delivery: {
        canAccess: true,
        canView: true,
        canCreate: true,
        canUpdate: true,
        canDelete: false,
        canExport: false,
        canAssignDriver: false,
        canApprove: false,
        canTransferSalary: false,
        canSeeDetail: true
      },
      product: {
        canAccess: false,
        canView: false,
        canCreate: false,
        canUpdate: false,
        canDelete: false
      }
      // Add more like: category, payment later
    }
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
