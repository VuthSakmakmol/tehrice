// utils/formatPhoneNumber.js
module.exports = function formatPhoneNumber(phone) {
    if (phone.startsWith('0')) {
      return '+855' + phone.slice(1);
    }
    return phone;
  };
  