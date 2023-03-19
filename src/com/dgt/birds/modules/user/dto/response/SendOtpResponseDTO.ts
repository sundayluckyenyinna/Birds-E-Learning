/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";

export default class SendOtpResponseDTO{
   @ApiProperty() responseCode;
   @ApiProperty() responseMessage;
}