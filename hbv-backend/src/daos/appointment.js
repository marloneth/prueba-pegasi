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
          nacimiento_date: {
            $toDate: '$nacimiento',
          },
        },
      },
    ])
      .match(filters)
      .sort({
        a_t: -1,
      })
      .project({
        nacimiento_date: 0,
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
