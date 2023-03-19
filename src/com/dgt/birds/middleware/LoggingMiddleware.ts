/* eslint-disable */

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import LoggerFactory from "../config/LoggerFactory";
@Injectable()
export default class LoggingMiddleware implements NestMiddleware
{

   globalLogger: LoggerFactory = LoggerFactory.createLogger("Birds-E-Learning");
    use(req: Request, res: Response, next: (error?: any) => void): any {
       const [url, method, ip] = [req.url, req.method, req.ip];
       const fullMessage: string = `${url}  ${method.toUpperCase()}  ${ip}`
       this.globalLogger.info(fullMessage);
       next();
    }

}