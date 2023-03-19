export declare enum CourseFormat {
    PDF = "PDF",
    DOC = "DOC",
    EXCEL = "EXCEL",
    POWER_POINT = "POWER_POINT",
    TEXT_FILE = "TEXT_FILE"
}
export default class CourseFormatValidator {
    static allCourseFormats: Array<CourseFormat>;
    static getAllValidFormats: () => Array<CourseFormat>;
    static getFormatByExtension: (ext: string) => CourseFormat;
}
