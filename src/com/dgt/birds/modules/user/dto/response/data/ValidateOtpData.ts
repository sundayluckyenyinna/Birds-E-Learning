/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";

export default class ValidateOtpData
{
   @ApiProperty() userEmail: string;
   @ApiProperty() otpValidatedDate: Date;
   @ApiProperty() userStatus: string;
}