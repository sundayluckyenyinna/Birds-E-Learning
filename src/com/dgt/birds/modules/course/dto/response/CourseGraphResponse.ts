/* eslint-disable */

import { ApiProperty } from "@nestjs/swagger";
import BravoCourseCategory from "../../model/BravoCourseCategory";


export class CourseGraphResponseData{
   @ApiProperty({ isArray: true, type: BravoCourseCategory }) categories: Array<BravoCourseCategory>;
}

export class CompactCourseGraphResponseData{
   @ApiProperty({ isArray: true, type: BravoCourseCategory }) trendingCategories: Array<BravoCourseCategory>;
   @ApiProperty({ isArray: true, type: BravoCourseCategory }) preferentialCategories: Array<BravoCourseCategory>;
   @ApiProperty({ isArray: true, type: BravoCourseCategory }) quickCategories: Array<BravoCourseCategory>;

}
export default class CourseGraphResponse
{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() categories: CourseGraphResponseData
}

export class CompactCourseGraphResponse{
   @ApiProperty() responseCode: string;
   @ApiProperty() responseMessage: string;
   @ApiProperty() responseData: CompactCourseGraphResponseData;
}