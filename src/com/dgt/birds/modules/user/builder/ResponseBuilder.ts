/* eslint-disable */

import ResponseDTO from "../../../config/ResponseDTO";
import { HttpStatus } from "@nestjs/common";

export default class ResponseBuilder
{
  private responseDTO : ResponseDTO = new ResponseDTO();
  responseCode = (responseCode: string): ResponseBuilder => {
    this.responseDTO.responseCode = responseCode;
    return this;
  }

  responseMessage = (responseMessage: string): ResponseBuilder => {
    this.responseDTO.responseMessage = responseMessage;
    return this;
  }

  responseData = (responseData: Object): ResponseBuilder => {
    this.responseDTO.responseData = responseData;
    return this;
  }

  httpStatus = (status: HttpStatus): ResponseBuilder => {
    this.responseDTO.httpStatus = status;
    return this;
  }
  build = () => this.responseDTO;
}