const createError = require('http-errors')
const { createLogger } = require('../config/logger')
const { getAppointmentsDao } = require('../daos/appointment')
const { diacriticSensitiveRegex } = require('../utils/regex')

const logger = createLogger('services/appointment.js')

async function getAppointmentsService(filters, hoursOffset) {
  try {
    logger.info('Getting appointments service')

    let appointments
    let nameRegex
    const dbFilters = {}
    const { firstName, lastName, age, date } = filters
    const utcToday = new Date()
    const today = new Date()
    today.setHours(utcToday.getHours() + hoursOffset)

    // Adding filter for appointment date
    if (date) {
      const appointmentDay = new Date(date).getDate()
      const nextDate = new Date(date)
      nextDate.setDate(appointmentDay + 1)

      dbFilters.fechaRegistro = {
        $gte: new Date(date),
        $lt: nextDate,
      }
    }

    // Adding filter for patient name
    if (firstName && lastName) {
      nameRegex = `${firstName} ${lastName}`
    } else if (firstName) {
      nameRegex = `${firstName} .*`
    } else if (lastName) {
      nameRegex = `.* ${lastName}`
    }

    if (nameRegex) {
      dbFilters['paciente.nombre'] = {
        $regex: diacriticSensitiveRegex(nameRegex),
        $options: 'i',
      }
    }

    // Adding filter for patient age
    if (age) {
      const patientAge = parseInt(age)
      const toDate = new Date()
      toDate.setFullYear(today.getFullYear() - patientAge)
      toDate.setDate(today.getDate() + 1)

      const fromDate = new Date()
      fromDate.setFullYear(today.getFullYear() - patientAge - 1)
      fromDate.setDate(today.getDate() + 1)

      dbFilters.fechaNacimiento_date = {
        $gte: new Date(fromDate.toDateString()),
        $lt: new Date(toDate.toDateString()),
      }
    }

    appointments = await getAppointmentsDao(dbFilters, today)
    return appointments
  } catch (error) {
    const { status } = error

    logger.error(
      'Error on getAppointmentsService: ',
      status ? error.message : error
    )

    if (status) throw error
    throw new createError.InternalServerError('Internal server error')
  }
}

module.exports = {
  getAppointmentsService,
}
