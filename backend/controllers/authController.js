const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ─────────────── LOGIN ───────────────
exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    console.log('🛂 Login attempt => phone:', phone, '| password:', password);

    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required.' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      console.log('❌ User not found:', phone);
      return res.status(404).json({ message: 'User not found' });
    }

    const inputPassword = password.toString().trim();
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    console.log('🔍 Password match?', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // ✅ Convert role to lowercase
    const lowercaseRole = user.role.toLowerCase();

    const token = jwt.sign(
      {
        userId: user._id,
        role: lowercaseRole,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: lowercaseRole
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// ─────────────── REGISTER ───────────────
exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    const existing = await User.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: 'Phone number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role: 'customer'  // ✅ already lowercase
    });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
