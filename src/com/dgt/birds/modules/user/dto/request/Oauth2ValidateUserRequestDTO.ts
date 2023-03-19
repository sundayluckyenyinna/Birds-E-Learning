/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { RequestChannels } from "../../../../const/RequestChannels";
import { Exclude } from "class-transformer";
import { OauthValidationTypes } from "../../../../const/OauthValidationTypes";

const requestChannels: Array<string> = [ RequestChannels.MOBILE, RequestChannels.WEB ]
const oauthValidationTypes: Array<string> = [ OauthValidationTypes.LOGIN, OauthValidationTypes.SIGNUP ]
export default class Oauth2ValidateUserRequestDTO
{
    @ApiProperty() @IsNotEmpty() consentCode: string;
    @ApiProperty() @IsNotEmpty() state: string;
    @ApiProperty() @IsNotEmpty() authServiceProvider: string;
    @ApiProperty() @IsNotEmpty() @IsIn(requestChannels) channel: string;
    @ApiProperty() deviceId: string;
    @ApiProperty({ default: "LOGIN" }) @IsNotEmpty() @IsIn(oauthValidationTypes) oauthValidationType: string;
}