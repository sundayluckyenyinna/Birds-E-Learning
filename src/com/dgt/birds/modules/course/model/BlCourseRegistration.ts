/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bl_course_registration" })
export default class BlCourseRegistration
{

  @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "course_reg_id", type: "uuid" })  // This will map to the courseId
   courseRegId: string;

   @Column({ name: "course_reg_date", type: "datetime" })
   courseRegDate: Date;

   @Column({ name: "course_reg_user_id", type: "uuid" })
   courseRegUserId: string;

   @Column({ name: "course_reg_channel", type: "varchar"} )
   courseRegChannel: string;

}