const app = require('./app');
const logger = require('./logger')
const port = process.env.PORT || 5000

app.listen(port, () => logger.info(`Server has been started on ${port}`));
