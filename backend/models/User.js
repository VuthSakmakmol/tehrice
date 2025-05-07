// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'delivery', 'customer'],
    default: 'customer'
  }
})

module.exports = mongoose.model('User', userSchema)
