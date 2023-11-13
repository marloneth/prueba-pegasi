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
    const params = req.query
    const hoursOffset = parseInt(req.headers['x-hours-offset'] ?? '0')
    const { error } = getAppointmentsQuerySchema.validate(params)
    const externalResource = params.externalResource ?? 'ST'
    const filters = { ...params }
    delete filters.externalResource

    if (error) throw new createError.BadRequest(error.message)

    const appointments = await getAppointmentsService(
      filters,
      hoursOffset,
      externalResource
    )

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
