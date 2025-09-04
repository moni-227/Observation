const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, personId, personType } = req.body;

    const exists = await Person.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const person = new Person({
      ...req.body,
      password: hashed,
    });

    await person.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password, personId } = req.body;

    const person = await Person.findOne({
      $or: [{ email }, { personId }],
    });

    if (!person) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, person.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: person._id, personType: person.personType },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: person._id,
        name: person.name,
        email: person.email,
        personId: person.personId,
        personType: person.personType,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
