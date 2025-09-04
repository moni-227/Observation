const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  personType: {
    type: String,
    required: true,
    enum: ['employee', 'visitor'],
    default: 'employee'
  },
  personId: {
    type: String,
    unique: true,
    required: [false, 'ID is mandatory.']
  },
  name: {
    type: String,
    required: [true, 'Name is mandatory.']
  },
  images: {
    front: {
      type: String,
      required: function () { return this.personType === 'employee'; }
    },
    left: {
      type: String,
      required: function () { return this.personType === 'employee'; }
    },
    right: {
      type: String,
      required: function () { return this.personType === 'employee'; }
    },
    signature: {
      type: String,
      required: function () { return this.personType === 'employee'; }
    }
  },
  location: String,

  // Employee-specific
  rfid: String,
  department: String,
  designation: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
    validate: {
      validator: function(value) {
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Please provide a valid email address.'
    }
  },
  password: String,
  mobileNumber: String,

  // Visitor-specific
  company: String,
  purpose: String,
  fromDateTime: Date,
  toDateTime: Date
}, { timestamps: true });

PersonSchema.pre('save', function(next) {
  if (!this.email || this.email.trim() === '') {
    this.email = undefined;
  }
  next();
});

module.exports = mongoose.model('Persons', PersonSchema);
