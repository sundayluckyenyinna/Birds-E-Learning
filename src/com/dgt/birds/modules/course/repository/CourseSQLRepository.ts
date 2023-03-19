/* eslint-disable */

import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import BlCourse from "../model/BlCourse";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";

@Injectable()
export default class CourseSQLRepository extends Repository<BlCourse>
{
    constructor(private readonly dataSource: DataSource) {
      super(BlCourse, dataSource.createEntityManager());
    }

    async fetchAllCourseByCategoryId(categoryId: number): Promise<DBOperationResult>{
       const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined };
       try{
         const courses: Array<BlCourse> = await this.find({ where: { categoryId: categoryId }});
         result.status = true; result.entity = courses;
       }catch (error){
          result.errorMessage = error;
       }
       return Promise.resolve(result);
    }

}