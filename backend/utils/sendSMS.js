// utils/sendSMS.js
const axios = require('axios');
const qs = require('qs');
const formatPhoneNumber = require('./formatPhoneNumber');

async function sendSMS(to, message) {
  const formattedPhone = formatPhoneNumber(to);
  const payload = qs.stringify({
    user: process.env.ZETTA_USER,
    pass: process.env.ZETTA_PASS,
    sender: process.env.ZETTA_SENDER,
    phone: formattedPhone,
    text: message,
    type: process.env.ZETTATEL_SMS_TYPE || 'text',
  });

  const response = await axios.post(process.env.ZETTATEL_API_URL, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { data } = response;
  if (!data || !data.ErrorCode || data.ErrorCode !== '000') {
    throw new Error('Failed to send SMS');
  }

  return data;
}

module.exports = sendSMS;
