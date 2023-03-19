/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class UpdatePasswordRequestDTO
{
   @ApiProperty() @IsNotEmpty() newPassword: string;
   @ApiProperty() @IsNotEmpty() emailAddress: string;
}