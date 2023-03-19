import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import BlCourse from "../model/BlCourse";
export interface ICourseRepository {
    createCourse(course: BlCourse): Promise<DBOperationResult>;
}
