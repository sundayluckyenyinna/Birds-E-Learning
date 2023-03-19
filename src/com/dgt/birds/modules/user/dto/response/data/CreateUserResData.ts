/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";

export default class  CreateUserResData
{
  @ApiProperty() emailAddress: string;
  @ApiProperty() username: string;
  @ApiProperty() createdDate: Date;
  @ApiProperty() deviceId?: string;
}