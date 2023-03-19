/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class UpdateUserPasswordRequestDTO{
   @ApiProperty() @IsNotEmpty() oldPassword: string;
   @ApiProperty() @IsNotEmpty() newPassword: string;

}