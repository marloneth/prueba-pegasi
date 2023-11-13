const mongoose = require('mongoose')
const { email, isoDate } = require('../utils/regex')

const patientDataSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 1,
  },
  dni: {
    type: String,
    required: true,
    minLength: 1,
  },
  fechaNacimiento: {
    type: String,
    required: true,
    match: [isoDate, 'fechaNacimiento is not valid'],
  },
  fechaFachecimiento: {
    type: String,
    match: [isoDate, 'fechaFachecimiento is not valid'],
  },
  cidudadNacimiento: {
    type: String,
    required: true,
    minLength: 1,
  },
  fallecido: {
    type: Boolean,
    required: true,
    default: false,
  },
  direccion: {
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
  casado: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const appointmentDataSchema = new mongoose.Schema({
  paciente: {
    type: patientDataSchema,
    required: true,
  },
  integration: {
    type: Boolean,
    required: true,
    default: false,
  },
  fechaRegistro: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fechaInicio: {
    type: Number,
    required: true,
    min: 0,
    max: 1439,
  },
  fechaFinal: {
    type: Number,
    required: true,
    min: 0,
    max: 1439,
  },
})

module.exports = mongoose.model('Appointment', appointmentDataSchema)
