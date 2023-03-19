import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import LoggerFactory from "../config/LoggerFactory";
export default class LoggingMiddleware implements NestMiddleware {
    globalLogger: LoggerFactory;
    use(req: Request, res: Response, next: (error?: any) => void): any;
}
