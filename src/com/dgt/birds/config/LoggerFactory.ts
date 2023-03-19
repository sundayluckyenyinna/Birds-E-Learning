/* eslint-disable */
import * as winston from "winston";
import * as process from "process";
import * as path from "path";
import { Logger } from "winston";

export default class LoggerFactory
{

    jsonLogger: Logger;
   defaultLogger: Logger;
   constructor(private readonly clazzName: string) {
      this.clazzName = clazzName;
      this.jsonLogger = LoggerFactory.createJsonLogger(clazzName);
      this.defaultLogger = LoggerFactory.createDefaultLogger(clazzName);
   }

   private static createDefaultLogger = (clazzName: string) => {
      const infoLogPath: string = path.join(LoggerFactory.getLogDirectory(), 'info_default.log');
      const errorLogPath: string = path.join(LoggerFactory.getLogDirectory(), 'error_default.log');
      const { combine, timestamp, label, printf } = winston.format

      const myFormat = printf(({ level, message, label, timestamp }) => {
         return ` [${label}]  -  ${timestamp}   :   [ ${clazzName} ]  :   [ ${level.toUpperCase()} ]   :   ${message}`;
      });

      return winston.createLogger({
         level: 'info',
         format: combine(
           label({ label: 'Birds-E-Learning' }),
           timestamp(),
           myFormat
         ),
         defaultMeta: { clazz: clazzName },
         transports: [
            new winston.transports.File({ filename: errorLogPath, level: 'error' }),
            new winston.transports.File({ filename: infoLogPath, level: 'info' }),
            new winston.transports.Console()
         ]
      });
   }

   private static createJsonLogger = (clazzName: string) => {
      const infoLogPath: string = path.join(LoggerFactory.getLogDirectory(), 'info_json.log');
      const errorLogPath: string = path.join(LoggerFactory.getLogDirectory(), 'error_json.log');

      return winston.createLogger({
         level: 'info',
         format: winston.format.json(),
         defaultMeta: { clazz: clazzName },
         transports: [
            new winston.transports.File({ filename: errorLogPath, level: 'error' }),
            new winston.transports.File({ filename: infoLogPath, level: 'info' }),
         ]
      });
   }

   log(level: string, message: string){
      this.defaultLogger.log(level, message);
      this.jsonLogger.log(level, message);
   }

   info(message: string){
      this.log('info', message);
   }

   error(message: string){
      this.log('error', message);
   }
   static createLogger = (className: string) => {
      return new LoggerFactory(className);
   }
   static getLogDirectory = (): string => {
      return path.join(process.cwd(), 'log');
   }
}