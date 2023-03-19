/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import LoginResponseData from "./data/LoginResponseData";

export default class LoginUserResponseDTO
{
    @ApiProperty() responseCode: string;
    @ApiProperty() responseMessage: string;
    @ApiProperty() responseData: LoginResponseData
}