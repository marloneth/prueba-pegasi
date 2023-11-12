const { createLogger } = require('./logger')

require('dotenv').config()

function connectDatabase() {
  const mongoose = require('mongoose')
  const logger = createLogger('config/db.js')

  let database
  const mongoString = process.env.DATABASE_URL

  mongoose.connect(mongoString)
  database = mongoose.connection

  database.on('error', (error) => {
    logger.error(error)
  })

  database.once('connected', () => {
    logger.info('Database Connected')
  })
}

module.exports = {
  connectDatabase,
}
