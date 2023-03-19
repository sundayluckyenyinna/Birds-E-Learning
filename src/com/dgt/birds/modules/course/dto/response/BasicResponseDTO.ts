/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";

export default class BasicResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
}