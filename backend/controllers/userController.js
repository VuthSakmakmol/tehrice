const User = require('../models/User');
const bcrypt = require('bcrypt');


// ─────────────── GET Admins ───────────────
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'Admin' });
    console.log('📥 SuperAdmin fetched all Admins');
    res.json(admins);
  } catch (err) {
    console.error('❌ Failed to fetch admins:', err.message);
    res.status(500).json({ message: 'Failed to fetch admins' });
  }
};

// ─────────────── CREATE Admin ───────────────
exports.createAdmin = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log('🛠 SuperAdmin creating Admin with:', req.body);

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: 'Phone number already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newAdmin = new User({ name, phone, password: hashedPassword, role: 'Admin' });
    await newAdmin.save();

    console.log('✅ Admin created by SuperAdmin:', newAdmin._id);
    res.status(201).json({ message: 'Admin created', user: newAdmin });
  } catch (err) {
    console.error('❌ Error creating Admin:', err.message);
    res.status(500).json({ message: 'Error creating Admin' });
  }
};

// ─────────────── UPDATE Admin ───────────────
exports.updateAdmin = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log(`✏️ SuperAdmin updating Admin ID: ${req.params.id}`);
    const updates = { name, phone };

    if (password) {
      updates.password = await bcrypt.hash(password.toString(), 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    console.log('✅ Admin updated:', updated._id);
    res.json({ message: 'Admin updated', user: updated });
  } catch (err) {
    console.error('❌ Error updating Admin:', err.message);
    res.status(500).json({ message: 'Failed to update Admin' });
  }
};

// ─────────────── DELETE Admin ───────────────
exports.deleteAdmin = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log('🗑️ Admin deleted by SuperAdmin:', req.params.id);
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    console.error('❌ Error deleting Admin:', err.message);
    res.status(500).json({ message: 'Failed to delete Admin' });
  }
};


// GET all Delivery users
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await User.find({ role: 'Delivery' });
    console.log(`📦 ${req.user.role} fetched all Deliveries`);
    res.json(deliveries);
  } catch (err) {
    console.error('❌ Failed to fetch deliveries:', err);
    res.status(500).json({ message: 'Failed to fetch deliveries' });
  }
};

// CREATE a Delivery user
exports.createDelivery = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log(`${req.user.role} creating delivery:`, req.body);

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: 'Phone already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newDelivery = new User({ name, phone, password: hashedPassword, role: 'Delivery' });
    await newDelivery.save();

    console.log('✅ Delivery user created:', newDelivery._id);
    res.status(201).json({ message: 'Delivery created', user: newDelivery });
  } catch (err) {
    console.error('❌ Error creating delivery:', err);
    res.status(500).json({ message: 'Failed to create delivery' });
  }
};

// UPDATE Delivery
exports.updateDelivery = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const updates = { name, phone };

    if (password) {
      updates.password = await bcrypt.hash(password.toString(), 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    console.log('✏️ Delivery updated:', updated._id);
    res.json({ message: 'Delivery updated', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update delivery' });
  }
};

// DELETE Delivery
exports.deleteDelivery = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log('🗑️ Delivery deleted:', req.params.id);
    res.json({ message: 'Delivery deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete delivery' });
  }
};

