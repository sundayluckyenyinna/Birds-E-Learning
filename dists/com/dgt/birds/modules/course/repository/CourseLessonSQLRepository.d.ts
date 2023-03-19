import { DataSource, Repository } from "typeorm";
import BlCourseLesson from "../model/BlCourseLesson";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
export default class CourseLessonSQLRepository extends Repository<BlCourseLesson> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    fetchAllCourseLessonByCourseId(courseId: number): Promise<DBOperationResult>;
}
