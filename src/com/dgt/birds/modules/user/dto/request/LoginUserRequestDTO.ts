/* eslint-disable */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsIn, IsNotEmpty } from "class-validator";
import { OauthChannels } from "../../../../const/OauthChannels";

const loginDomains: Array<string> = [OauthChannels.LOCAL_DOMAIN, OauthChannels.GOOGLE, OauthChannels.FACEBOOK, OauthChannels.APPLE];
export default class LoginUserRequestDTO
{

  @ApiProperty({description: "User's email", default: "user@gmail.com", type: String})
  @IsNotEmpty() @IsEmail()
  public email: string;

  @ApiProperty({description: "User's password", default: "password!23", type: String})
  public password: string;

  @ApiProperty({ description: "The user login channel", default: "MOBILE", type: String })
  @IsNotEmpty()
  public channel: string;

  @ApiProperty({ description: "User device Id", type: String })
  public deviceId: string;

  @ApiProperty({ description: "Remember me field ", type: Boolean })
  @IsNotEmpty() @IsBoolean()
  rememberMe: boolean;

  @ApiProperty({ description: "The mode of login", type: String, default: loginDomains[0] })
  @IsNotEmpty() @IsIn(loginDomains)
  loginBy: string;

   constructor(email: string, password: string) {
     this.email = email;
     this.password = password;
   }

}


export class AutomaticLoginRequestDTO{
    @ApiProperty() deviceId: string;
    @ApiProperty() channel: string;
}