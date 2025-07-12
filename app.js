const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, 'register')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register', 'login.html'));
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/swap', require('./routes/swapRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
