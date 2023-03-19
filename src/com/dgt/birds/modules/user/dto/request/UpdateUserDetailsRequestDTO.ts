/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsNotEmpty, IsOptional } from "class-validator";

export default class UpdateUserDetailsRequestDTO
{
    @ApiProperty() fullName: string;
    @ApiProperty() emailAddress: string;
    @ApiProperty() mobileNumber: string;
    @ApiProperty() gender: string;
    @ApiProperty() @IsOptional() @IsBase64()  photoLink: string;

}