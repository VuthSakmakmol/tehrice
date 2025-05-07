const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    console.log('🛂 Login attempt => phone:', phone, '| password:', password);

    // Basic validation
    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required.' });
    }

    // Find user
    const user = await User.findOne({ phone });
    if (!user) {
      console.log('❌ User not found:', phone);
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const inputPassword = password.toString().trim();
    const isMatch = await bcrypt.compare(inputPassword, user.password);
    console.log('🔍 Password match?', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role.toLowerCase(),
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, phone, password } = req.body

    // Check if phone already exists
    const existing = await User.findOne({ phone })
    if (existing) {
      return res.status(400).json({ message: 'Phone number already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user with default role 'customer'
    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      role: 'customer'
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
