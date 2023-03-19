/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";

export default class OauthCreateUserResData{
   @ApiProperty() oauthConsentUrl: string;
}