require('./config/db').connectDatabase()

const express = require('express')
const { createLogger } = require('./config/logger')
const routes = require('./routes/index')

const logger = createLogger('index.js')

const app = express()
const port = process.env.APP_PORT

app.use(express.json())

app.use('/api', routes)

app.listen(port, () => {
  logger.info(`HBV Server is running on http://localhost:${port}`)
})
