import BravoCourseCategory from "../../model/BravoCourseCategory";
export declare class CourseGraphResponseData {
    categories: Array<BravoCourseCategory>;
}
export declare class CompactCourseGraphResponseData {
    trendingCategories: Array<BravoCourseCategory>;
    preferentialCategories: Array<BravoCourseCategory>;
    quickCategories: Array<BravoCourseCategory>;
}
export default class CourseGraphResponse {
    responseCode: string;
    responseMessage: string;
    categories: CourseGraphResponseData;
}
export declare class CompactCourseGraphResponse {
    responseCode: string;
    responseMessage: string;
    responseData: CompactCourseGraphResponseData;
}
