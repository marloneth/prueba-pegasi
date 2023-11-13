require('dotenv').config()

const { getLogger } = require('log4js')

function createLogger(category) {
  const logger = getLogger(category)
  logger.level = process.env.LOGGER_LEVEL || 'info'
  return logger
}

module.exports = {
  createLogger,
}
