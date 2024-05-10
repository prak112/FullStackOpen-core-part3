// imports using CommonJS
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// listen to PORT and log
app.listen(config.PORT, () => {
    logger.info(`Server running on ${config.PORT}`)
})