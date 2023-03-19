import { DataSource, Repository } from "typeorm";
import BravoCourseCategoryUser from "../model/BravoCourseCategoryUser";
import CourseSQLRepository from "./CourseSQLRepository";
export default class BravoCourseCategoryUserSQLRepository extends Repository<BravoCourseCategoryUser> {
    private readonly dataSource;
    private readonly courseRepository;
    constructor(dataSource: DataSource, courseRepository: CourseSQLRepository);
    getCourseIdsByOccurrence(limit?: number): Promise<number[][]>;
}
