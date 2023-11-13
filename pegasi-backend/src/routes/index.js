const { Router } = require('express')
const appointmentRouter = require('./appointments')

const router = Router()

router.use('/appointment', appointmentRouter)

module.exports = router
