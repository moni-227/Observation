require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());    // parse JSON bodies

app.get('/', (_req, res) => res.send('Observation API is running'));

app.use('/api/observations', require('./routes/observations'));

const PORT = 'mongodb://localhost:27017/safety' || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  })
  .catch(err => console.error('Mongo connect error:', err));
