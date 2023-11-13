const axios = require('axios')
const { createLogger } = require('../config/logger')

const logger = createLogger('utils/api.js')

async function getFromExternalAPI(url, headers) {
  try {
    logger.info('Getting data from external resource')
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    logger.error('Error on getFromExternalAPI', error)
    throw error
  }
}

module.exports = {
  getFromExternalAPI,
}
