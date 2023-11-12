const mongoose = require('mongoose')
const { email, isoDate } = require('../utils/regex')

const appointmentDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  identifier: {
    type: String,
    required: true,
    minLength: 1,
  },
  birthDate: {
    type: String,
    required: true,
    match: [isoDate, 'birthDate is not valid'],
  },
  deceasedBirth: {
    type: String,
    match: [isoDate, 'deceasedBirth is not valid'],
  },
  birthCity: {
    type: String,
    required: true,
    minLength: 1,
  },
  isDeceased: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: String,
    required: true,
    minLength: 1,
  },
  email: {
    type: String,
    lowercase: true,
    minLength: 1,
    match: [email, 'email is not valid'],
  },
  married: {
    type: Boolean,
    required: true,
    default: false,
  },
  integration: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('Appointment', appointmentDataSchema)
