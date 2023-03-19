/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import User from "../../model/User";

export default class UserDetailsListDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty({ isArray: true, type: User }) responseData: Array<User>;
}

export class UserDetailsDTO{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: User;
}