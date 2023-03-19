/* eslint-disable*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import BlCourse from "./BlCourse";

@Entity({ name: "bravo_course_category" })
export default class BravoCourseCategory
{
   @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "name", type: "varchar" }) @ApiProperty()
   name: string;

   @Column({ name: "image_id", type: "int" }) @ApiProperty()
   imageId: number;

   @Column({ name: "content", type: "text" }) @ApiProperty()
   content: string;

   @Column({ name: "slug", type: "varchar" }) @ApiProperty()
   slug: string;

   @Column({ name: "status", type: "varchar" }) @ApiProperty()
   status: string;

   @Column({ name: "_lft", type: "int" }) @ApiProperty()
   _lft: number;

   @Column({ name: "_rgt", type: "int" }) @ApiProperty()
   _rgt: number;

   @Column({ name: "parent_id", type: "int" }) @ApiProperty()
   parentId: number;

   @Column({ name: "create_user", type: "int" }) @ApiProperty()
    createUser: number;

   @Column({ name: "update_user", type: "int" }) @ApiProperty()
   updateUser: number;

   @Column({ name: "deleted_at", type: "timestamp" }) @ApiProperty()
   deletedAt: Date;

   @Column({ name: "origin_id", type: "bigint" }) @ApiProperty()
   originId: number;

   @Column({ name: "lang", type: "varchar" }) @ApiProperty()
   lang: string;

   @Column({ name: "created_at", type: "timestamp" }) @ApiProperty()
   createdAt: Date;

   @Column({ name: "updated_at", type: "timestamp"}) @ApiProperty()
   updatedAt: Date;

   @ApiProperty({ isArray: true, type: BlCourse }) courses: Array<BlCourse>;
}