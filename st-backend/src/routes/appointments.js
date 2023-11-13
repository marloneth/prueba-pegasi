const { Router } = require('express')
const { getAppointmentsController } = require('../controllers/appointment')

const appointmentRouter = Router()

appointmentRouter.get('/', getAppointmentsController)

module.exports = appointmentRouter
