/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserPasswordResponseData{
   @ApiProperty() userEmail: string;
   @ApiProperty() userId: string;
   @ApiProperty() updatedAt: Date;
}

export default class UpdateUserPasswordResponseDTO{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: UpdateUserPasswordResponseData
}
