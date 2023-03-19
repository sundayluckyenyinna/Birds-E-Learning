/* eslint-disable*/

import { DataSource, In, Repository } from "typeorm";
import BravoCourseCategory from "../model/BravoCourseCategory";
import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import { Injectable } from "@nestjs/common";
import CourseSQLRepository from "./CourseSQLRepository";
import CourseLessonSQLRepository from "./CourseLessonSQLRepository";
import BlCourse from "../model/BlCourse";
import BlCourseLesson from "../model/BlCourseLesson";
import BravoCourseCategoryUserSQLRepository from "./BravoCourseCategoryUserSQLRepository";
import ApplicationPropertyConfig from "../../../config/ApplicationPropertyConfig";

const environment = ApplicationPropertyConfig;
const defaultQueryLimit: number = Number(environment.getProperty("birds.entities.defaultQueryLimit"));
@Injectable()
export default class CourseCategorySQLRepository extends Repository<BravoCourseCategory>{
   constructor(
     private readonly dataSource: DataSource,
     private readonly courseRepository: CourseSQLRepository,
     private readonly courseLessonRepository: CourseLessonSQLRepository,
     private readonly courseCategoryUserRepository: BravoCourseCategoryUserSQLRepository
   ) { super(BravoCourseCategory, dataSource.createEntityManager()); }

   async fetchAllCourseCategories(): Promise<DBOperationResult>{
        const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
        try {
           const allCourseCategories: Array<BravoCourseCategory> = await this.find();
           result.status = true; result.entity = allCourseCategories;
        }catch (error){
          result.errorMessage = error;
        }
        return Promise.resolve(result);
   }

   async fetchAllCourseCategoriesNestedGraph(): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
      try{
          const entity: Array<BravoCourseCategory> = [];
          let categories: Array<BravoCourseCategory> = await this.find();
          // Shuffle the categories
          categories = categories
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

          for(let i = 0; i < categories.length; i++){
            const category: BravoCourseCategory = categories[i];
            const courses: Array<BlCourse> = (await this.courseRepository.fetchAllCourseByCategoryId(1)).entity as Array<BlCourse>;
            for(let j = 0; j < courses.length; j++){
              const course: BlCourse = courses[j];
              course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity as Array<BlCourseLesson>;
            }
            category.courses = courses;
            entity.push(category);
          }
          result.status = true; result.entity = entity;
      } catch (error){
          result.errorMessage = error;
      }

      return Promise.resolve(result);
   }

   async fetchAllCourseCategoriesNestedGraphByPreferenceNames(preferenceNames: Array<string>, limit? : number ): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
      try {
         const entity: Array<BravoCourseCategory> = [];
         let categories: Array<BravoCourseCategory> = await this.find({ where: { name: In(preferenceNames) }, take: limit || defaultQueryLimit });

         // Shuffle the categories everytime.
         categories = categories
           .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

         for(let i = 0; i < categories.length; i++){
            const category: BravoCourseCategory = categories[i];
            const courses: Array<BlCourse> = (await this.courseRepository.fetchAllCourseByCategoryId(category.id)).entity as Array<BlCourse>;
            for(let j = 0; j < courses.length; j++){
              const course: BlCourse = courses[j];
              course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity as Array<BlCourseLesson>;
            }
            category.courses = courses;
            entity.push(category);
          }
          result.status = true; result.entity = entity;
      }catch (error){
          result.errorMessage = error;
      }
      return Promise.resolve(result);
   }

   async fetchAllQuickCourseNestedCategories(size?: number):Promise<DBOperationResult>{
     const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
     const limit: number = size || defaultQueryLimit;
     try {
       const entity: Array<BravoCourseCategory> = [];
       let categories: Array<BravoCourseCategory> = await this.find({ order: { createdAt: 'DESC' }, take: limit });

       // Shuffle the categories everytime.
       categories = categories
         .map(value => ({ value, sort: Math.random() }))
         .sort((a, b) => a.sort - b.sort)
         .map(({ value }) => value);

       for(let i = 0; i < categories.length; i++){
         const category: BravoCourseCategory = categories[i];
         const courses: Array<BlCourse> = (await this.courseRepository.fetchAllCourseByCategoryId(category.id)).entity as Array<BlCourse>;
         for(let j = 0; j < courses.length; j++){
           const course: BlCourse = courses[j];
           course.lessons = (await this.courseLessonRepository.fetchAllCourseLessonByCourseId(course.id)).entity as Array<BlCourseLesson>;
         }
         category.courses = courses;
         entity.push(category);
       }
       result.status = true; result.entity = entity;
     }catch (error){

     }
     return Promise.resolve(result);
   }

    async fetchTrendingCategoriesNested(limit?: number): Promise<DBOperationResult>{
      const result: DBOperationResult = { status: false, entity: null, errorMessage: undefined }
      try{
        const courseIdsAndCount: number[][] = await this.courseCategoryUserRepository.getCourseIdsByOccurrence(limit || defaultQueryLimit);
        const courseCategoryMap: { categoryId: number, courses: Array<BlCourse> } = {} as {categoryId: number, courses: Array<BlCourse>};
        const distinctCategories: BravoCourseCategory[] = [];
        for(let i = 0; i < courseIdsAndCount.length; i++){
          const courseIdAndCount: number[] = courseIdsAndCount[i];
          const courseId: number = courseIdAndCount[0];
          const course: BlCourse = await this.courseRepository.findOne({ where: { id: courseId }});
          course.lessons = await this.courseLessonRepository.find({ where: { courseId: courseId } });
          const categoryId: number = course.categoryId;
          let courses: Array<BlCourse> = Object(courseCategoryMap)[categoryId];
          if( courses === undefined ) {
            courses = [];
            courses.push(course);
            Object(courseCategoryMap)[categoryId] = courses;
          }
          else{
            courses.push(course);
            Object(courseCategoryMap)[categoryId] = courses;
          }
        }
        const categoryIds: number[] = Object.keys(courseCategoryMap).map(key => Number(key));
        for(let j = 0; j < categoryIds.length; j++){
          const categoryId: number = categoryIds[j];
          const courseCategory: BravoCourseCategory = await this.findOne({ where: { id: categoryId }});
          courseCategory.courses = courseCategoryMap[categoryId];
          distinctCategories.push(courseCategory);
        }
        result.status = true; result.entity = distinctCategories;
      }catch (error){
        result.errorMessage = error;
      }
      return Promise.resolve(result);
    }

}