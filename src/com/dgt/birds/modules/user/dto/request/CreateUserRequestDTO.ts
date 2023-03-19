/* eslint-disable */

import { UserGender } from "../../constants/UserGender";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBase64, IsBoolean, IsDateString, IsEmail, IsIn, IsNotEmpty, IsNumberString } from "class-validator";
import { RequestChannels } from "../../../../const/RequestChannels";
import { UserRoles } from "../../constants/UserRoles";
import { buildJSInitOptions } from "@nestjs/swagger/dist/swagger-ui/helpers";
import { OauthChannels } from "../../../../const/OauthChannels";

const signupDomains: Array<string> = [OauthChannels.LOCAL_DOMAIN, OauthChannels.GOOGLE, OauthChannels.FACEBOOK, OauthChannels.APPLE];
export default class CreateUserRequestDTO
{
   @ApiProperty({type: String, description: "User's first name", required: true})
   @IsNotEmpty()
   firstName: string;

   @ApiProperty({type: String, description: "User's last name", required: true})
   @IsNotEmpty()
   lastName: string;

   @ApiProperty({type: String, description: "User's middle name", required: false})
   middleName: string;

   @ApiProperty({type: String, description: "User's home address", required: false})
   address: string;

   @ApiProperty({type: String, description: "User's email address", required: true})
   @IsNotEmpty() @IsEmail()
   emailAddress: string;

   @ApiProperty({type: String, description: "User's mobile's number", required: false})
   mobileNumber: string;

   @ApiProperty({type: String, description: "User's date of birth", required: false})
   dateOfBirth: string

   @ApiProperty({type: Array, description: "User's role", required: true})
   @IsNotEmpty() @IsArray()
   userRoles: Array<string>;

   @ApiProperty({type: String, description: "User's first name", required: true})
   @IsNotEmpty()
   username: string;

   @ApiProperty({type: String, description: "User's password", required: true})
   password: string;

   @ApiProperty({type: String, description: "User's photo in BASE-64", required: false})
   photo: string; // BASE-64

   @ApiProperty({type: String, description: "User's mobile deviceId or IMEI", required: false})
   deviceId: string;

   @ApiProperty({type: String, description: "User's geo location", required: false, default: "(1.35, 5.67)"})
   geoLocation: string

   @ApiProperty({type: String, description: "User's gender", required: false, default: "Male"})
   gender: UserGender;

   @ApiProperty({type: String, description: "User's language", required: false, default: "English"})
   language: string;

   @ApiProperty({type: String, description: "User's city", required: false, default: "Akoka"})
   city: string;

   @ApiProperty({type: String, description: "User's country", required: false, default: "Nigeria"})
   country: string;

   @ApiProperty({type: String, description: "User's signup channel", required: true, default: "MOBILE"})
   @IsNotEmpty() @IsIn([RequestChannels.MOBILE, RequestChannels.WEB])
   channel: string

   @ApiProperty({ type: Boolean, description: "Flag for remember me feature" })
   rememberMe: boolean;

   @ApiProperty({ type: String, description: "The channel of signup", default: signupDomains[0], example: signupDomains[1] })
   @IsNotEmpty() @IsIn(signupDomains)
   signupBy: string;

}