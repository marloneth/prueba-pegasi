const createError = require('http-errors')

const { createLogger } = require('../config/logger')
const Appointment = require('../models/appointment')

const logger = createLogger('daos/appointment.js')

async function getAppointmentsDao(filters) {
  try {
    logger.info('Getting appointments')
    const appointments = await Appointment.aggregate([
      {
        $addFields: {
          fechaNacimiento_date: {
            $toDate: '$paciente.fechaNacimiento',
          },
        },
      },
    ])
      .match(filters)
      .sort({
        fechaRegistro: -1,
      })

    return appointments
  } catch (error) {
    logger.error('Database error: ', error)
    throw new createError.InternalServerError('Database Error')
  }
}

async function createAppointmentsDao(appointmentsData) {
  try {
    logger.info('Creating new appointments dao')
    const appointments = await Appointment.create(appointmentsData)
    return appointments
  } catch (error) {
    logger.error('Database error: ', error)
    throw new createError.InternalServerError('Database Error')
  }
}

module.exports = {
  getAppointmentsDao,
  createAppointmentsDao,
}
