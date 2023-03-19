/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";


export class UpdatePasswordResponseData{
  @ApiProperty() newPassword: string;
  @ApiProperty() dateUpdated: Date;
}
export default class UpdatePasswordResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: UpdatePasswordResponseData;
}

