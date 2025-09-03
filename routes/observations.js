const express = require('express');
const router = express.Router();
const Observation = require('../models/Observation');

// Create
router.post('/', async (req, res) => {
  try {
    const obs = await Observation.create(req.body);
    res.status(201).json(obs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all (simple list)
router.get('/', async (_req, res) => {
  const all = await Observation.find().sort({ createdAt: -1 });
  res.json(all);
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const obs = await Observation.findById(req.params.id);
    if (!obs) return res.status(404).json({ message: 'Not found' });
    res.json(obs);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;
