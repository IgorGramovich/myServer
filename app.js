const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // логирование запросов
const app = express();

/* routes */
const temperatureRoutes = require('./routes/temperature')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
const apiLogger = morgan(':date[iso] [:method] "url::url" [HTTP/:http-version] :status :res[content-length] ":referrer"', { stream: accessLogStream })

app.use(apiLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/temperature', temperatureRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

module.exports = app;
