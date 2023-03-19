"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const process = require("process");
const path = require("path");
class LoggerFactory {
    constructor(clazzName) {
        this.clazzName = clazzName;
        this.clazzName = clazzName;
        this.jsonLogger = LoggerFactory.createJsonLogger(clazzName);
        this.defaultLogger = LoggerFactory.createDefaultLogger(clazzName);
    }
    log(level, message) {
        this.defaultLogger.log(level, message);
        this.jsonLogger.log(level, message);
    }
    info(message) {
        this.log('info', message);
    }
    error(message) {
        this.log('error', message);
    }
}
exports.default = LoggerFactory;
LoggerFactory.createDefaultLogger = (clazzName) => {
    const infoLogPath = path.join(LoggerFactory.getLogDirectory(), 'info_default.log');
    const errorLogPath = path.join(LoggerFactory.getLogDirectory(), 'error_default.log');
    const { combine, timestamp, label, printf } = winston.format;
    const myFormat = printf(({ level, message, label, timestamp }) => {
        return ` [${label}]  -  ${timestamp}   :   [ ${clazzName} ]  :   [ ${level.toUpperCase()} ]   :   ${message}`;
    });
    return winston.createLogger({
        level: 'info',
        format: combine(label({ label: 'Birds-E-Learning' }), timestamp(), myFormat),
        defaultMeta: { clazz: clazzName },
        transports: [
            new winston.transports.File({ filename: errorLogPath, level: 'error' }),
            new winston.transports.File({ filename: infoLogPath, level: 'info' }),
            new winston.transports.Console()
        ]
    });
};
LoggerFactory.createJsonLogger = (clazzName) => {
    const infoLogPath = path.join(LoggerFactory.getLogDirectory(), 'info_json.log');
    const errorLogPath = path.join(LoggerFactory.getLogDirectory(), 'error_json.log');
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { clazz: clazzName },
        transports: [
            new winston.transports.File({ filename: errorLogPath, level: 'error' }),
            new winston.transports.File({ filename: infoLogPath, level: 'info' }),
        ]
    });
};
LoggerFactory.createLogger = (className) => {
    return new LoggerFactory(className);
};
LoggerFactory.getLogDirectory = () => {
    return path.join(process.cwd(), 'log');
};
//# sourceMappingURL=LoggerFactory.js.map