const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: ["https://observationm.onrender.com"] }));

app.use('/api/observations', require('./routes/observations'));

const MONGO_URI = 'mongodb+srv://admin:admin@crm.emoz4sc.mongodb.net/Observation';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch(err => console.error(err));

