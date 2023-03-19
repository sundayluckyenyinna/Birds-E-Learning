/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import ValidateOtpData from "./data/ValidateOtpData";
import ResponseDTO from "../../../../config/ResponseDTO";

export default class ValidateOtpResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: ValidateOtpData
}