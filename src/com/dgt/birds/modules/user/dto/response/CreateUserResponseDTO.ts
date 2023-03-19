/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import CreateUserResData from "./data/CreateUserResData";

export default class CreateUserResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: CreateUserResData
}