/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";


export class InternalServerErrorResponseDTO {

  @ApiProperty({default: "99"})
  responseCode: string;

  @ApiProperty({ default: "Internal system error. Please contact administrator or support"})
  responseMessage: string;
}


export class BadRequestResponseDTO
{

  @ApiProperty({ default: "08", type: String })
  responseCode: string;

  @ApiProperty({ default: "Email cannot be empty", type: String })
  responseMessage: string;

}


export class Oauth2ConsentUrlData{
  @ApiProperty() authorizationConsentUrl: string;
}

export class Oauth2ConsentUrlDTO {

  @ApiProperty() responseCode: string;
  @ApiProperty() responseMessage: string;
  @ApiProperty() responseData: Oauth2ConsentUrlData

}
