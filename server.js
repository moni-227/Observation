const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: ["https://observationm.onrender.com"], // ✅ Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(helmet());
app.use(morgan('dev'));

// ✅ API Routes
app.use('/api/observations', require('./routes/observations'));

// ✅ Serve React build files
app.use(express.static(path.join(__dirname, 'build')));

// ✅ React fallback
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// ✅ MongoDB & Server
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://adventistech2025:XOGhPBZxi0gDSPNO@cluster0.awnrusw.mongodb.net/OptiMES40';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));


