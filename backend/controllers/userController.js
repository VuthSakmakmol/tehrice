const User = require('../models/User');
const bcrypt = require('bcrypt');

// ─────────────── GET Admins ───────────────
exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    console.log('📥 Superadmin fetched all admins');
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
    console.log('🛠 Superadmin creating admin with:', req.body);

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const exists = await User.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: 'Phone number already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const newAdmin = new User({ name, phone, password: hashedPassword, role: 'admin' });
    await newAdmin.save();

    console.log('✅ Admin created by superadmin:', newAdmin._id);
    res.status(201).json({ message: 'Admin created', user: newAdmin });
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    res.status(500).json({ message: 'Error creating admin' });
  }
};

// ─────────────── UPDATE Admin ───────────────
exports.updateAdmin = async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    console.log(`✏️ Superadmin updating admin ID: ${req.params.id}`);
    const updates = { name, phone };

    if (password) {
      updates.password = await bcrypt.hash(password.toString(), 10);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    console.log('✅ Admin updated:', updated._id);
    res.json({ message: 'Admin updated', user: updated });
  } catch (err) {
    console.error('❌ Error updating admin:', err.message);
    res.status(500).json({ message: 'Failed to update admin' });
  }
};

// ─────────────── DELETE Admin ───────────────
exports.deleteAdmin = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log('🗑️ Admin deleted by superadmin:', req.params.id);
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    console.error('❌ Error deleting admin:', err.message);
    res.status(500).json({ message: 'Failed to delete admin' });
  }
};

exports.getAdminCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'admin' });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to count admins' });
  }
};

// ─────────────── GET Deliveries ───────────────
exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await User.find({ role: 'delivery' });
    console.log(`📦 ${req.user.role} fetched all deliveries`);
    res.json(deliveries);
  } catch (err) {
    console.error('❌ Failed to fetch deliveries:', err);
    res.status(500).json({ message: 'Failed to fetch deliveries' });
  }
};

// ─────────────── CREATE Delivery ───────────────
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
    const newDelivery = new User({ name, phone, password: hashedPassword, role: 'delivery' });
    await newDelivery.save();

    console.log('✅ Delivery user created:', newDelivery._id);
    res.status(201).json({ message: 'Delivery created', user: newDelivery });
  } catch (err) {
    console.error('❌ Error creating delivery:', err);
    res.status(500).json({ message: 'Failed to create delivery' });
  }
};

// ─────────────── UPDATE Delivery ───────────────
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

// ─────────────── DELETE Delivery ───────────────
exports.deleteDelivery = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log('🗑️ Delivery deleted:', req.params.id);
    res.json({ message: 'Delivery deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete delivery' });
  }
};





// ───── GET Customers ─────
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
    res.json(customers)
  } catch (err) {
    console.error('❌ Failed to fetch customers:', err.message)
    res.status(500).json({ message: 'Failed to fetch customers' })
  }
}

// ───── CREATE Customer ─────
exports.createCustomer = async (req, res) => {
  try {
    const { name, phone, password, status = 'Active' } = req.body

    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' })
    }

    const exists = await User.findOne({ phone })
    if (exists) {
      return res.status(409).json({ message: 'Phone already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10)
    const newCustomer = new User({
      name,
      phone,
      password: hashedPassword,
      role: 'customer',
      status
    })

    await newCustomer.save()
    res.status(201).json({ message: 'Customer created', user: newCustomer })
  } catch (err) {
    console.error('❌ Error creating customer:', err.message)
    res.status(500).json({ message: 'Failed to create customer' })
  }
}

// ───── UPDATE Customer ─────
exports.updateCustomer = async (req, res) => {
  try {
    const { name, phone, password, status } = req.body
    const updates = { name, phone, status }

    if (password) {
      updates.password = await bcrypt.hash(password.toString(), 10)
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updates, { new: true })
    res.json({ message: 'Customer updated', user: updated })
  } catch (err) {
    console.error('❌ Error updating customer:', err.message)
    res.status(500).json({ message: 'Failed to update customer' })
  }
}

// ───── DELETE Customer ─────
exports.deleteCustomer = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Customer deleted' })
  } catch (err) {
    console.error('❌ Error deleting customer:', err.message)
    res.status(500).json({ message: 'Failed to delete customer' })
  }
}

