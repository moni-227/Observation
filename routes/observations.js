const express = require('express');
const router = express.Router();
const Observation = require('../models/Observation');

// Create
// router.post('/', async (req, res) => {
//   try {
//     const obs = await Observation.create(req.body);
//     res.status(201).json(obs);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    let { latitude, longitude } = req.body;
    let address = null;

    if (latitude && longitude) {
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              format: "json",
              lat: latitude,
              lon: longitude,
            },
            headers: {
              "User-Agent": "observation-app/1.0 (your-email@example.com)",
            },
            timeout: 5000, // prevent hanging
          }
        );

        address = response.data?.display_name || null;
        console.log("✅ Resolved address:", address);
      } catch (fetchErr) {
        console.error("❌ Reverse geocoding failed:", fetchErr.message);
      }
    }

    const obs = await Observation.create({
      ...req.body,
      resolvedAddress: address,
    });

    res.status(201).json(obs);
  } catch (err) {
    console.error("❌ Save error:", err);
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

