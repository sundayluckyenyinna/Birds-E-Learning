/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";


export class DateFormat{
  @ApiProperty() year: number;
  @ApiProperty() month: number;
  @ApiProperty() day: number;
  @ApiProperty() hours: number;
  @ApiProperty() minutes: number;
  @ApiProperty() seconds: number;
}
export default class LoginResponseData
{
  @ApiProperty() userId: string;
  @ApiProperty() username: string;
  @ApiProperty() email: string;@ApiProperty()
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() middleName: string;
  @ApiProperty() fullName: string;
  @ApiProperty() address: string;
  @ApiProperty() mobileNumber;
  @ApiProperty() status: string;
  @ApiProperty() dateOfBirth: DateFormat;
  @ApiProperty() lastLoginDate: DateFormat;
  @ApiProperty() photoLink: string;
  @ApiProperty() createdDate: DateFormat;
  @ApiProperty() modifiedDate: DateFormat;
  @ApiProperty() deviceId: string;
  @ApiProperty() geoLocation: string;
  @ApiProperty() gender: string;
  @ApiProperty() language: string;
  @ApiProperty() city: string;
  @ApiProperty() country: string;
  @ApiProperty() authToken: string;
}
