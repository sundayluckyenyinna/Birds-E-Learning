/* eslint-disable */

import { Module } from "@nestjs/common";
import CourseController from "./controller/CourseController";
import CourseService from "./service/CourseService";
import UserPreferenceSQLRepository from "./repository/UserPreferenceSQLRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlUserPreference from "./model/BlUserPreference";
import UserSQLRepository from "../user/repository/UserSQLRepository";
import MessageSource from "../../config/MessageSource";
import CourseCategorySQLRepository from "./repository/CourseCategorySQLRepository";
import BravoCourseCategory from "./model/BravoCourseCategory";
import CourseSQLRepository from "./repository/CourseSQLRepository";
import CourseLessonSQLRepository from "./repository/CourseLessonSQLRepository";
import BlCourse from "./model/BlCourse";
import BlCourseLesson from "./model/BlCourseLesson";
import BravoCourseCategoryUser from "./model/BravoCourseCategoryUser";
import BravoCourseCategoryUserSQLRepository from "./repository/BravoCourseCategoryUserSQLRepository";

@Module({
  imports: [TypeOrmModule.forFeature([BlUserPreference, BravoCourseCategory,
    BlCourse, BlCourseLesson, BravoCourseCategoryUser])
  ],
  controllers: [CourseController],
  providers: [
    CourseService, UserPreferenceSQLRepository, UserSQLRepository,
    CourseCategorySQLRepository, MessageSource,
    CourseSQLRepository, CourseLessonSQLRepository, BravoCourseCategoryUserSQLRepository
  ],
})
export default class CourseModule{

}