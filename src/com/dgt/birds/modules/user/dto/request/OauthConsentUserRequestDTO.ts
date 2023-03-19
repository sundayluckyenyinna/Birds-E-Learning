/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { OauthChannels } from "../../../../const/OauthChannels";
import { RequestChannels } from "../../../../const/RequestChannels";


const requestChannels: Array<string> = [RequestChannels.MOBILE, RequestChannels.WEB]
export default class OauthConsentUserRequestDTO
{
   @ApiProperty() @IsNotEmpty() @IsIn([OauthChannels.GOOGLE, OauthChannels.FACEBOOK, OauthChannels.APPLE])
    authServiceProvider: string;
   @ApiProperty() @IsNotEmpty() @IsIn(requestChannels) channel: string;
   @ApiProperty() @IsNotEmpty() deviceId: string;
}