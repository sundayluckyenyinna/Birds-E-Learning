/* eslint-disable */

import { DBOperationResult } from "../../user/interfaces/UserModuleInterfaces";
import BlCourse from "../model/BlCourse";

export interface ICourseRepository{

   // CREATE FUNCTIONALITY
  createCourse(course: BlCourse): Promise<DBOperationResult>;
}