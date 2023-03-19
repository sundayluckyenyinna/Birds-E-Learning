import { DataSource, Repository } from "typeorm";
import BravoCourseCategory from "../model/BravoCourseCategory";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import CourseSQLRepository from "./CourseSQLRepository";
import CourseLessonSQLRepository from "./CourseLessonSQLRepository";
import BravoCourseCategoryUserSQLRepository from "./BravoCourseCategoryUserSQLRepository";
export default class CourseCategorySQLRepository extends Repository<BravoCourseCategory> {
    private readonly dataSource;
    private readonly courseRepository;
    private readonly courseLessonRepository;
    private readonly courseCategoryUserRepository;
    constructor(dataSource: DataSource, courseRepository: CourseSQLRepository, courseLessonRepository: CourseLessonSQLRepository, courseCategoryUserRepository: BravoCourseCategoryUserSQLRepository);
    fetchAllCourseCategories(): Promise<DBOperationResult>;
    fetchAllCourseCategoriesNestedGraph(): Promise<DBOperationResult>;
    fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames: Array<string>, limit?: number): Promise<DBOperationResult>;
    fetchAllQuickCourseNestedCategories(size?: number): Promise<DBOperationResult>;
    fetchTrendingCategoriesNested(limit?: number): Promise<DBOperationResult>;
}
