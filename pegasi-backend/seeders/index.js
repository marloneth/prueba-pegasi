require('../src/config/db').connectDatabase()

const { createLogger } = require('../src/config/logger')
const { populateAppointments } = require('../seeders/appointment')

const logger = createLogger('seeders')

logger.info('Seeders starting')
Promise.all([populateAppointments()]).then(() => {
  logger.info('Seeders finished')
  process.exit()
})
