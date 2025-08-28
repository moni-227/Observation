const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const path = require('path');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: ["https://observationm.onrender.com"], // ✅ Frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(helmet());
app.use(morgan('dev'));

// Test route
app.get('/', (_req, res) => res.send('Observation API is running'));

// Routes
app.use('/api/observations', require('./routes/observations'));

// Serve React build for production
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ Hardcode Mongo URI & PORT
const PORT = 5000;
const MONGO_URI = 'mongodb+srv://admin:admin@crm.emoz4sc.mongodb.net/Observation';

// Connect MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));


