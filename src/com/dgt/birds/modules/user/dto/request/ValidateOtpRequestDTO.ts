/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export default class ValidateOtpRequestDTO
{
  @ApiProperty({ default: "236489", required: true }) @IsNotEmpty() @IsNumberString()
   otp: string;

  @ApiProperty({ default: "useremail@gmail.com"}) @IsNotEmpty() @IsEmail()
   userEmail: string;
}