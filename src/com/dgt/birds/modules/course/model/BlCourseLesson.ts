/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "bravo_course_lessons" })
export default class BlCourseLesson
{
   @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "section_id", type: "int" }) @ApiProperty()
   sectionId: number;

   @Column({ name: "course_id", type: "int" }) @ApiProperty()
   courseId: number;

   @Column({ name: "name", type: "varchar" }) @ApiProperty()
   name: string;

   @Column({ name: "content", type: "text" }) @ApiProperty()
   content: string;

   @Column({ name: "short_desc", type: "text" }) @ApiProperty()
   shortDesc: string;

   @Column({ name: "duration", type: "int" }) @ApiProperty()
   duration: number;

   @Column({ name: "slug", type: "varchar" }) @ApiProperty()
   slug: string;

   @Column({ name: "file_id", type: "bigint" }) @ApiProperty()
   fileId: number;

   @Column({ name: "type", type: "varchar" }) @ApiProperty()
   type: string;

   @Column({ name: "url", type: "text" }) @ApiProperty()
   url: string;

   @Column({ name: "preview_url", type: "varchar" }) @ApiProperty()
   previewUrl: string;

   @Column({ name: "active", type: "tinyint" }) @ApiProperty()
   active: boolean;

   @Column({ name: "display_order", type: "tinyint" }) @ApiProperty()
   displayOrder: boolean;

   @Column({ name: "origin_id", type: "bigint" }) @ApiProperty()
   originId: number;

   @Column({ name: "lang", type: "varchar" }) @ApiProperty()
   language: string;

   @Column({ name: "create_user", type: "bigint" }) @ApiProperty()
   createUser: number;

   @Column({ name: "update_user", type: "bigint" }) @ApiProperty()
   updateUser: number;

   @Column({ name: "created_at", type: "timestamp" }) @ApiProperty()
    createdAt: Date;

   @Column({ name: "updated_at", type: "timestamp" }) @ApiProperty()
   updatedAt: Date;

   @Column({ name: "deleted_at", type: "timestamp" }) @ApiProperty()
   deletedAt: Date;

   @Column({ name: "image_id", type: "int" }) @ApiProperty()
   imageId: number;

   @Column({ name: "icon", type: "varchar" }) @ApiProperty()
    icon: string;

}