import { Logger } from "winston";
export default class LoggerFactory {
    private readonly clazzName;
    jsonLogger: Logger;
    defaultLogger: Logger;
    constructor(clazzName: string);
    private static createDefaultLogger;
    private static createJsonLogger;
    log(level: string, message: string): void;
    info(message: string): void;
    error(message: string): void;
    static createLogger: (className: string) => LoggerFactory;
    static getLogDirectory: () => string;
}
