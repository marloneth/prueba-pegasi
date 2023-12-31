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
          birthDate_date: {
            $toDate: '$birthDate',
          },
        },
      },
    ])
      .match(filters)
      .sort({
        createdAt: -1,
      })
      .project({
        birthDate_date: 0,
      })

    return appointments
  } catch (error) {
    logger.error('Database error: ', error)
    throw new createError.InternalServerError('Database Error')
  }
}

module.exports = {
  getAppointmentsDao,
}
