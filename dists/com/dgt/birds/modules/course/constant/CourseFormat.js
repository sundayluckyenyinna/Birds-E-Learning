"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseFormat = void 0;
var CourseFormat;
(function (CourseFormat) {
    CourseFormat["PDF"] = "PDF";
    CourseFormat["DOC"] = "DOC";
    CourseFormat["EXCEL"] = "EXCEL";
    CourseFormat["POWER_POINT"] = "POWER_POINT";
    CourseFormat["TEXT_FILE"] = "TEXT_FILE";
})(CourseFormat = exports.CourseFormat || (exports.CourseFormat = {}));
class CourseFormatValidator {
}
exports.default = CourseFormatValidator;
CourseFormatValidator.allCourseFormats = [
    CourseFormat.PDF, CourseFormat.DOC,
    CourseFormat.EXCEL, CourseFormat.POWER_POINT,
    CourseFormat.TEXT_FILE
];
CourseFormatValidator.getAllValidFormats = () => CourseFormatValidator.allCourseFormats;
CourseFormatValidator.getFormatByExtension = (ext) => {
    let result = CourseFormat.PDF;
    switch (ext) {
        case "doc": {
            result = CourseFormat.DOC;
            break;
        }
        case "xslx": {
            result = CourseFormat.EXCEL;
            break;
        }
        case "txt": {
            result = CourseFormat.TEXT_FILE;
            break;
        }
        case "ppt": {
            result = CourseFormat.POWER_POINT;
            break;
        }
    }
    return result;
};
//# sourceMappingURL=CourseFormat.js.map