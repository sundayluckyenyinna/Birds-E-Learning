/* eslint-disable */
import { Injectable, NestMiddleware } from "@nestjs/common";
import UserApiPaths from "../modules/user/constants/UserApiPaths";
import UserSQLRepository from "../modules/user/repository/UserSQLRepository";
import ResponseCodes from "../const/ResponseCodes";
import ResponseDTO from "../config/ResponseDTO";
import JwtTokenUtil from "../security/JwtTokenUtil";
import { DBOperationResult } from "../modules/user/interfaces/UserModuleInterfaces";
import UserAuth from "../modules/user/model/UserAuth";
import MessageSource from "../config/MessageSource";
import GenericConstants from "../const/GenericConstants";
import {Request, Response} from "express";
import LoggerFactory from "../config/LoggerFactory";

/**
 * This middle-ware is used to filter out all those request that have invalid authorization or empty Bearer
 * token header.
 * The Sign-up and login endpoint are exempted from this filter
 */
@Injectable()
export default class AuthenticationMiddleware implements NestMiddleware
{

    logger: LoggerFactory = LoggerFactory.createLogger(AuthenticationMiddleware.name);
  constructor(private readonly userRepository: UserSQLRepository,
              private readonly messageSource: MessageSource
  ) {
  }

  async use(req: Request, res: Response, next: (error?: any) => void): Promise<any> {
      const requestUrl: string = req.originalUrl;
      this.logger.info("Endpoint: ".concat(requestUrl));

      // Do not apply authorization of token to user related endpoints.
      if (!requestUrl.startsWith("/user") && !requestUrl.startsWith("/img"))
      {
          const authorizationHeader: string = req.get(GenericConstants.AUTH_HEADER);
          let code = ResponseCodes.FAILED_AUTHENTICATION;
          let message;
          let dbResult: DBOperationResult;
          let response: ResponseDTO;
          let failureOrSuccessPrefix: string = "Authorization status: ";
          let reasonString: string = ", Reason: ";

          // Check for the presence of the 'Authorization' header.
          if (authorizationHeader === null || authorizationHeader === undefined) {
              message = this.messageSource.getRawMessage("security.auth.noAuthProvided");
              response = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
              this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
              return res.status(401).json(response);
          }

          // Check that the Authorization header is properly formatted.
          if(!authorizationHeader.startsWith("Bearer ")){
              message = this.messageSource.getRawMessage('security.auth.invalidFormatAuthHeader');
              response = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
              this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
              return res.status(403).json(response);
          }

          // Check that the Authorization header is not empty or blank.
          if (authorizationHeader.length === 0) {
              message = this.messageSource.getRawMessage("security.auth.blankAuth");
              response = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
              this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
              return res.status(401).json(response);
          }

          const token: string = authorizationHeader.replace(GenericConstants.AUTH_PREFIX, GenericConstants.EMPTY_STRING);
          const email: string = JwtTokenUtil.getEmailFromToken(token);
          dbResult = await this.userRepository.findUserByEmail(email);
          if (dbResult.status) {
              if (dbResult.entity === null) {
                  message = this.messageSource.getRawMessage("security.auth.noRecord");
                  response = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                  this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                  return res.status(401).json(response);
              }
          }
          dbResult = await this.userRepository.findUserByEmail(email);
          if(dbResult){
              if(dbResult.entity !== null){
                  const isExpiredToken: boolean = JwtTokenUtil.isTokenExpired(dbResult.entity as UserAuth);
                  if(isExpiredToken){
                      message = this.messageSource.getRawMessage("security.auth.tokenExpired");
                      response = ResponseDTO.builder().responseCode(code).responseMessage(message).build();
                      this.logger.info(failureOrSuccessPrefix.concat("Failed").concat(reasonString).concat(message));
                      return res.status(401).json(response);
                  }
              }
          }

          this.logger.info(failureOrSuccessPrefix.concat("Success").concat(reasonString).concat("All criteria passed!"));

      }

      next();  // Move to the next middleware.
  }

}