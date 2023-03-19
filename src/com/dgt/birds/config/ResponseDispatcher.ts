/** eslint-disable */
import { Response } from "express";
import ResponseDTO from "./ResponseDTO";
import { HttpStatus } from "@nestjs/common";

export default class ResponseDispatcher
{
    static respond = (response: Response, responseDto: ResponseDTO) => {
        return response.status(responseDto.httpStatus || HttpStatus.OK).json(responseDto);
    }
}