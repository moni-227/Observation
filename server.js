require('dotenv').config();require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: ["https://observationm.onrender.com", "http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('Observation API is running'));

// Routes
app.use('/api/observations', require('./routes/observations'));

// DB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin:admin@crm.emoz4sc.mongodb.net/Observation')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () => console.log(`API running`));
  })
  .catch(err => console.error('Mongo connect error:', err));


