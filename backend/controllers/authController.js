const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const sendSMS = require('../utils/sendSMS'); // use utility only

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ 1. Register
exports.register = async (req, res) => {
  try {
    const { fullName, phone, password } = req.body;
    const exists = await Customer.findOne({ phone });
    if (exists) return res.status(400).json({ message: 'Phone already registered' });

    const otp = generateOtp();
    const hashed = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      fullName,
      phone,
      password: hashed,
      otpCode: otp,
    });

    await sendSMS(phone, `Your TEHRICE OTP is ${otp}`);
    req.io.emit('customer:registered', { phone });

    res.status(201).json({ message: 'Registered. OTP sent.', customerId: customer._id });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

// ✅ 2. Verify OTP
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const customer = await Customer.findOne({ phone });
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  if (customer.otpCode !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  customer.isVerified = true;
  customer.otpCode = null;
  await customer.save();

  req.io.emit('customer:verified', { phone });
  res.status(200).json({ message: 'Phone verified' });
};

// ✅ 3. Resend OTP
exports.resendOtp = async (req, res) => {
  const { phone } = req.body;
  const customer = await Customer.findOne({ phone });
  if (!customer) return res.status(404).json({ message: 'Customer not found' });

  const otp = generateOtp();
  customer.otpCode = otp;
  await customer.save();

  await sendSMS(phone, `Your new OTP is ${otp}`);
  req.io.emit('customer:otpResent', { phone });
  res.status(200).json({ message: 'OTP resent' });
};

// ✅ 4. Login
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const customer = await Customer.findOne({ phone });
    if (!customer) return res.status(404).json({ message: 'Not found' });

    const match = await bcrypt.compare(password, customer.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });
    if (customer.status === 'Blocked') return res.status(403).json({ message: 'Blocked' });

    req.io.emit('customer:login', { phone });
    res.status(200).json({
      message: 'Login success',
      user: {
        _id: customer._id,
        fullName: customer.fullName,
        phone,
        isVerified: customer.isVerified
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// ✅ 5. Forgot Password
exports.forgotPassword = async (req, res) => {
  const { phone } = req.body;
  const customer = await Customer.findOne({ phone });
  if (!customer) return res.status(404).json({ message: 'Not found' });

  const otp = generateOtp();
  customer.otpCode = otp;
  await customer.save();

  await sendSMS(phone, `Reset OTP is ${otp}`);
  req.io.emit('customer:forgotPassword', { phone });

  res.status(200).json({ message: 'OTP sent to reset password' });
};

// ✅ 6. Reset Password
exports.resetPassword = async (req, res) => {
  const { phone, otp, newPassword } = req.body;
  const customer = await Customer.findOne({ phone });

  if (!customer || customer.otpCode !== otp)
    return res.status(400).json({ message: 'Invalid OTP or phone' });

  customer.password = await bcrypt.hash(newPassword, 10);
  customer.otpCode = null;
  await customer.save();

  req.io.emit('customer:passwordReset', { phone });
  res.status(200).json({ message: 'Password updated' });
};
