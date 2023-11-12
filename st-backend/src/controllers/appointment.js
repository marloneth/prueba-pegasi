const createError = require('http-errors')
const { createLogger } = require('../config/logger')
const { getAppointmentsService } = require('../services/appointment')
const {
  getAppointmentsQuerySchema,
} = require('../validationSchemas/appointment')

const logger = createLogger('controllers/appointment.js')

async function getAppointmentsController(req, res) {
  try {
    logger.info('Getting appointments controller')
    const filters = req.query
    const { error } = getAppointmentsQuerySchema.validate(filters)

    if (error) throw new createError.BadRequest(error.message)

    const appointments = await getAppointmentsService(filters)

    return res.status(200).json({
      status: 'success',
      message: 'Appointments retrieved successfully',
      data: {
        appointments,
      },
    })
  } catch (error) {
    const { status } = error
    const typedError = status
      ? error
      : createError.InternalServerError('Internal server error')

    logger.error('Error on getAppointmentsController: ', typedError.message)

    return res.status(typedError.status).json({
      status: 'error',
      message: typedError.message,
      data: {},
    })
  }
}

module.exports = {
  getAppointmentsController,
}
