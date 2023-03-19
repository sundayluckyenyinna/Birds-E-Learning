/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";

export class CourseCategoryData{
   @ApiProperty() name: string;
   @ApiProperty() imageId: number;
   @ApiProperty() content: string;
   @ApiProperty() slug: string;
   @ApiProperty() status: string;
   @ApiProperty() language: string;
   @ApiProperty() createdAt: Date;
   @ApiProperty() updatedAt: Date;
}
export class CourseCategoryListResponseDTO
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty({isArray: true, type: CourseCategoryData }) responseData: Array<CourseCategoryData>
}