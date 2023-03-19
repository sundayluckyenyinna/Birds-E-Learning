import { NestMiddleware } from "@nestjs/common";
import UserSQLRepository from "../modules/user/repository/UserSQLRepository";
import MessageSource from "../config/MessageSource";
import { Request, Response } from "express";
import LoggerFactory from "../config/LoggerFactory";
export default class AuthenticationMiddleware implements NestMiddleware {
    private readonly userRepository;
    private readonly messageSource;
    logger: LoggerFactory;
    constructor(userRepository: UserSQLRepository, messageSource: MessageSource);
    use(req: Request, res: Response, next: (error?: any) => void): Promise<any>;
}
