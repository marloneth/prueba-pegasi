const createError = require('http-errors')
const moment = require('moment')
const { createLogger } = require('../config/logger')
const { getAppointmentsDao } = require('../daos/appointment')
const { diacriticSensitiveRegex } = require('../utils/regex')
const { getHBVAppointmentsAndSave } = require('./hbvAppointmentAdapter')
const { getSTAppointmentsAndSave } = require('./stAppointmentAdapter')
const { formatAppointmentsData } = require('../utils/dataFormat')
const { getDatePart } = require('../utils/date')

const logger = createLogger('services/appointment.js')

async function getAppointmentsService(filters, hoursOffset, externalResource) {
  try {
    logger.info('Getting appointments service')

    let localAppointments
    let appointments
    let nameRegex
    const dbFilters = {}
    const { firstName, lastName, age, date } = filters
    const today = moment.utc().add(hoursOffset, 'hours').toDate()
    const todayDateString = getDatePart(today)

    // Adding filter for appointment date
    if (date) {
      const appointmentDate = moment.utc(date).toDate()
      const nextDate = moment.utc(date).add(1, 'day').toDate()

      dbFilters.fechaRegistro = {
        $gte: appointmentDate,
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
      const toDate = moment
        .utc(todayDateString)
        .add(1, 'day')
        .subtract(patientAge, 'years')
        .toDate()

      const fromDate = moment
        .utc(todayDateString)
        .add(1, 'day')
        .subtract(patientAge + 1, 'years')
        .toDate()

      dbFilters.fechaNacimiento_date = {
        $gte: fromDate,
        $lt: toDate,
      }
    }

    // Looking for local appointments first
    localAppointments = await getAppointmentsDao(dbFilters, today)
    if (localAppointments.length) {
      return formatAppointmentsData(localAppointments, todayDateString)
    }

    // If not found, look for the external ones
    if (externalResource === 'HBV') {
      appointments = await getHBVAppointmentsAndSave(filters, hoursOffset)
    } else {
      appointments = await getSTAppointmentsAndSave(filters, hoursOffset)
    }

    return formatAppointmentsData(appointments, todayDateString)
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
