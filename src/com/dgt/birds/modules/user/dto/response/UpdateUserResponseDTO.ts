/* eslint-disable */

import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";


export class UpdateUserResponseData{
  @ApiProperty() newEmail: string | null;
  @ApiProperty() newMobileNumber: string | null;
  @ApiProperty() newFirstName: string | null;
  @ApiProperty() newMiddleName: string | null;
  @ApiProperty() newLastName: string | null;
  @ApiProperty() newGender: string | null;
  @ApiProperty() newPhotoLink: string;
  @ApiProperty() updatedAt: Date;
  @ApiProperty() updatedBy: string;
}
export default class UpdateUserResponseDTO{

   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: UpdateUserResponseData
}

