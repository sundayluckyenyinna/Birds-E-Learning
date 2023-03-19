/* eslint-disable */

import { DataSource, Repository } from "typeorm";
import BravoCourseCategoryUser from "../model/BravoCourseCategoryUser";
import CourseSQLRepository from "./CourseSQLRepository";
import { Injectable } from "@nestjs/common";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";


const environment = ApplicationPropertyConfig;
const defaultQueryLimit: number = Number(environment.getProperty("birds.entities.defaultQueryLimit"));
@Injectable()
export default class BravoCourseCategoryUserSQLRepository extends Repository<BravoCourseCategoryUser>{
    constructor(
      private readonly dataSource: DataSource,
      private readonly courseRepository: CourseSQLRepository

    ) {
      super(BravoCourseCategoryUser, dataSource.createEntityManager());
    }

    async getCourseIdsByOccurrence(limit?: number): Promise<number[][]>{
        const courseIdsObject: { courseId: number }[] = await this.createQueryBuilder("bravo_course_user")
          .select("course_id as courseId")
          .distinct(true)
          .limit(limit || defaultQueryLimit)
          .execute();
        const courseIds: number[] = courseIdsObject.map(obj => obj.courseId);
        const courseIdsAndCount: number[][] = [];
        for(let i = 0; i < courseIds.length; i++){
          const courseId: number = courseIds[i];
           const countForId: number = await this.count({ where: { courseId: courseId } });
           courseIdsAndCount.push([courseId, countForId]);
        }
        return courseIdsAndCount.sort((a,b) => b[1] - a[1]);
    }

}