/* eslint-disable */

import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import MessageSource from "../config/MessageSource";
import ResponseCodes from "../const/ResponseCodes";
import ResponseDTO from "../config/ResponseDTO";

@Catch(BadRequestException)
export default class BirdsExceptionFilter implements ExceptionFilter
{
  private messageSource: MessageSource = new MessageSource();
    catch(exception: BadRequestException, host: ArgumentsHost): any
    {
       const context: HttpArgumentsHost = host.switchToHttp();
       const response: Response = context.getResponse<Response>();
       const status: number = exception.getStatus();
       let errorMessage: string = "Bad request";
       const message = exception.getResponse()['message'];
       if(typeof message === 'string')
         errorMessage = message;
       else if (typeof message === 'object')
         errorMessage = message.join(', ');
       const errorResponse: ResponseDTO = ResponseDTO.builder()
                                                .responseCode(ResponseCodes.BAD_REQUEST)
                                                .responseMessage(errorMessage).build();
       response.status(status).json(errorResponse);
    }

}