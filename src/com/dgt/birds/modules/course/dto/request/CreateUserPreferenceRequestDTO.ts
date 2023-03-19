/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEmpty, IsIn, IsNotEmpty } from "class-validator";
import { RequestChannels } from "../../../../const/RequestChannels";

export default class CreateUserPreferenceRequestDTO
{

   @ApiProperty({ type: String, isArray: false, example: "MOBILE" })
   @IsNotEmpty()
   @IsIn([ RequestChannels.WEB, RequestChannels.MOBILE ])
   channel: string;

   @ApiProperty()
   deviceId: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsArray()
   preferenceList: Array<string>;
}