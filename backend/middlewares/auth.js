const jwt = require('jsonwebtoken');

// ─────────────── VERIFY TOKEN ───────────────
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      role: decoded.role?.toLowerCase(), // ✅ Ensures role is always lowercase
      name: decoded.name
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ─────────────── AUTHORIZE BY ROLE ───────────────
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    next();
  };
};


module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(decoded.role.toLowerCase())) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }
      
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
