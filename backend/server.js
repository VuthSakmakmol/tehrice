const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const seedSuperAdmin = require('./utils/seedSuperAdmin');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// ✅ Inject io to all requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/superadmin', require('./routes/superAdminRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // Customer OTP routes

// ✅ MongoDB + SuperAdmin Seed
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    seedSuperAdmin(); // Auto seed SuperAdmin
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server + WebSocket running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Socket.IO Event Log
io.on('connection', (socket) => {
  console.log('🟢 WebSocket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 WebSocket disconnected:', socket.id);
  });
});
