const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  receiverName: { type: String },
  phone: { type: String },
  street: { type: String },
  district: { type: String },
  province: { type: String },
  zip: { type: String },
  isDefault: { type: Boolean, default: false }
}, { _id: false });

const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true }, // e.g. "CUS-0001" (optional, auto-gen)
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },

  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  dob: { type: Date },
  profileImage: { type: String },

  addresses: [addressSchema], // Multiple addresses
  otpCode: { type: String, default: null }, // For login/reset
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['Active', 'Blocked', 'Deleted'], default: 'Active' },

  // Reserved for future
  cart: { type: Array, default: [] },       // Optional
  wishlist: { type: Array, default: [] },   // Optional
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
