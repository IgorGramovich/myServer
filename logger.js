const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, simple, printf, metadata, colorize } = format;

const date = new Date().toISOString().split('T')[0]
const filename = path.join(__dirname, 'logs', `${date}-logfile.log`);
const errorFilename = path.join(__dirname, 'logs', `${date}-error-logfile.log`);

const myFormat = printf(({ level, message, timestamp, metadata }) => {
    const meta = Object.keys(metadata).length !== 0 ? ` meta:${JSON.stringify(metadata)}` : ''
    return `${timestamp} [${level}] ${message}${meta}`;
})

const logger = createLogger({
    format: combine(
        metadata(),
        timestamp(),
        myFormat,
    ),
    transports: [
        new transports.File({ filename }),
        new transports.File({
            filename: errorFilename,
            level: 'error',
            handleExceptions: true,
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            colorize(),
            simple()
        )
    }));
}

module.exports = logger
