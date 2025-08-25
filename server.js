require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ✅ CORS setup
app.use(cors({
  origin: ["https://observationm.onrender.com"], // Your React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(helmet());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('Observation API is running'));

// Routes
app.use('/api/observations', require('./routes/observations'));

// ✅ Use Render's PORT
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@crm.emoz4sc.mongodb.net/Observation')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
  })
  .catch(err => console.error('Mongo connect error:', err));
