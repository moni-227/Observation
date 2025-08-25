require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const cors = require("cors");
app.use(cors({
  origin: ["https://observationm.onrender.com"], // ✅ Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());    // parse JSON bodies

app.get('/', (_req, res) => res.send('Observation API is running'));

app.use('/api/observations', require('./routes/observations'));



mongoose
  .connect('mongodb+srv://admin:admin@crm.emoz4sc.mongodb.net/Observation')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log(`API listening on :${5000}`));
  })
  .catch(err => console.error('Mongo connect error:', err));
