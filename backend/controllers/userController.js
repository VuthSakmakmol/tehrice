const User = require('../models/User');
const bcrypt = require('bcrypt');

// GET all Admins
exports.getAdmins = async (req, res) => {
  const admins = await User.find({ role: 'Admin' });
  res.json(admins);
};

// POST Create Admin
exports.createAdmin = async (req, res) => {
  const { name, phone, password } = req.body;
  const exists = await User.findOne({ phone });
  if (exists) return res.status(409).json({ message: 'Phone already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const newAdmin = new User({ name, phone, password: hashed, role: 'Admin' });
  await newAdmin.save();
  res.status(201).json(newAdmin);
};

// PUT Update Admin
exports.updateAdmin = async (req, res) => {
  const { name, phone, password } = req.body;
  const updatedFields = { name, phone };
  if (password) updatedFields.password = await bcrypt.hash(password, 10);

  const updated = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  res.json(updated);
};

// DELETE Admin
exports.deleteAdmin = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Admin deleted' });
};
