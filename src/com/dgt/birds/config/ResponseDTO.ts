/* eslint-disable */

import ResponseBuilder from "../modules/user/builder/ResponseBuilder";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { HttpStatus } from "@nestjs/common";

export default class ResponseDTO
{
    @ApiProperty() responseCode!: string;
    @ApiProperty() responseMessage!: string;
    @ApiProperty() responseData?: Object
    @Exclude() httpStatus: HttpStatus;
    static builder = (): ResponseBuilder => new ResponseBuilder();
}