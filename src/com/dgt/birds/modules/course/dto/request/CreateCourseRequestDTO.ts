/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class CreateCourseRequestDTO{
   @ApiProperty() @IsNotEmpty()  courseName: string;
   @ApiProperty() @IsNotEmpty() courseDescription: string;
   @ApiProperty() @IsNotEmpty() courseCategory: string;

}