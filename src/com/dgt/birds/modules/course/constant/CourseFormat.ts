/* eslint-disable */

export enum CourseFormat
{
   PDF = "PDF",
   DOC = "DOC",
   EXCEL = "EXCEL",
   POWER_POINT = "POWER_POINT",
   TEXT_FILE = "TEXT_FILE"
}


/**
 * This class encapsulates the logic for basic validations and helper methods related to the course entity
 */
export default class CourseFormatValidator{
    static allCourseFormats: Array<CourseFormat> = [
      CourseFormat.PDF, CourseFormat.DOC,
      CourseFormat.EXCEL, CourseFormat.POWER_POINT,
      CourseFormat.TEXT_FILE
    ]

   static getAllValidFormats = (): Array<CourseFormat> => CourseFormatValidator.allCourseFormats;
    static getFormatByExtension = (ext: string): CourseFormat => {
      let result: CourseFormat = CourseFormat.PDF;
      switch (ext)
       {
         case "doc" : { result = CourseFormat.DOC; break; }
         case "xslx": { result = CourseFormat.EXCEL; break; }
         case "txt": { result = CourseFormat.TEXT_FILE; break; }
         case "ppt": { result = CourseFormat.POWER_POINT; break; }
       }
       return result;
    }

}