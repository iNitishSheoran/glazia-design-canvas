const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const canvasRoutes = require('./routes/canvasRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ DB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/canvases', canvasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));