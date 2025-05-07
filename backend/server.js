const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ First create app
const app = express();

// ✅ Then configure CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Then load config and middlewares
dotenv.config();
app.use(express.json());

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 4789, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4789}`)
    );
  })
  .catch(err => console.error('❌ MongoDB error:', err.message));
