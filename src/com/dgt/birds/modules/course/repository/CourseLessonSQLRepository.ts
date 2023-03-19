/* eslint-disable */

import { DataSource, Repository } from "typeorm";
import BlCourseLesson from "../model/BlCourseLesson";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class CourseLessonSQLRepository extends Repository<BlCourseLesson>
{
     constructor(private readonly dataSource: DataSource) {
       super(BlCourseLesson, dataSource.createEntityManager());
     }

     async fetchAllCourseLessonByCourseId(courseId: number): Promise<DBOperationResult>{
        const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
        try{
          const lessons: Array<BlCourseLesson> = await this.find({ where: { courseId: courseId }});
          result.status = true; result.entity = lessons;
        }catch (error){
           result.errorMessage = error;
        }
        return Promise.resolve(result);
     }

}