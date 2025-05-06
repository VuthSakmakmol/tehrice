const bcrypt = require('bcryptjs');
const SuperAdmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin'); // You need to create this model
const jwt = require('jsonwebtoken');

// ✅ Super Admin Login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await SuperAdmin.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'Super Admin not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user._id, role: 'SuperAdmin' }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// ✅ View All Admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admins', error: err.message });
  }
};

// ✅ Create Admin (by Super Admin)
exports.createAdmin = async (req, res) => {
  try {
    const { username, phone, password, permissions } = req.body;

    const exists = await Admin.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'Phone already registered' });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      phone,
      password: hashed,
      role: 'Admin',
      permissions
    });

    res.status(201).json({ message: 'Admin created', admin });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create admin', error: err.message });
  }
};

// ✅ Update Admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, permissions } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      id,
      { username, permissions },
      { new: true }
    );

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin updated', admin });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// ✅ Delete Admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed', error: err.message });
  }
};
