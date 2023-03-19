/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import OauthCreateUserResData from "./data/OauthCreateUserResData";

export default class OauthCreateUserResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: OauthCreateUserResData
}