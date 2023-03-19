import { DataSource, Repository } from "typeorm";
import BlCourse from "../model/BlCourse";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
export default class CourseSQLRepository extends Repository<BlCourse> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    fetchAllCourseByCategoryId(categoryId: number): Promise<DBOperationResult>;
}
