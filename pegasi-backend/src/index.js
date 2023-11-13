require('./config/db').connectDatabase()

const express = require('express')
const cors = require('cors')
const { createLogger } = require('./config/logger')
const routes = require('./routes/index')

const logger = createLogger('index.js')

const app = express()
const port = process.env.APP_PORT

app.use(express.json())
app.use(cors())

app.use('/api', routes)

app.listen(port, () => {
  logger.info(`Pegasi Server is running on http://localhost:${port}`)
})
