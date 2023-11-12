const mongoose = require('mongoose')
const { email, isoDate } = require('../utils/regex')

const appointmentDataSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: true,
    minLength: 1,
  },
  cedula: {
    type: String,
    required: true,
    minLength: 1,
  },
  nacimiento: {
    type: String,
    required: true,
    match: [isoDate, 'nacimiento date is not valid'],
  },
  fallecido: {
    type: String,
    match: [isoDate, 'fallecido date is not valid'],
  },
  ciudad_nacido: {
    type: String,
    required: true,
    minLength: 1,
  },
  direccion_actual: {
    type: String,
    required: true,
    minLength: 1,
  },
  correoActual: {
    type: String,
    lowercase: true,
    minLength: 1,
    match: [email, 'correoActual is not valid'],
  },
  a_t: {
    type: Date,
    required: true,
    default: Date.now,
  },
  UT: {
    type: Date,
  },
})

module.exports = mongoose.model('Appointment', appointmentDataSchema)
