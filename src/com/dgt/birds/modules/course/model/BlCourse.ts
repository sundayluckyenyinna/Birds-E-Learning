/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import BlCourseLesson from "./BlCourseLesson";

@Entity({ name: "bravo_courses" })
export default class BlCourse
{
   @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "title", type: "varchar" }) @ApiProperty()
   title: string;

   @Column({ name: "slug", type: "varchar" }) @ApiProperty()
   slug: string;

   @Column({ name: "content", type: "text" }) @ApiProperty()
   content: string;

   @Column({ name: "image_id", type: "int" }) @ApiProperty()
   imageId: number;

   @Column({ name: "banner_image_id", type: "int" }) @ApiProperty()
   bannerImageId: number;

   @Column({ name: "short_desc", type: "text" }) @ApiProperty()
   shortDesc: string;

   @Column({ name: "category_id", type: "int" }) @ApiProperty()
   categoryId: number;

   @Column({ name: "is_featured", type: "tinyint" }) @ApiProperty()
   isFeatured: boolean;

   @Column({ name: "gallery", type: "varchar" }) @ApiProperty()
   gallery: string;

   @Column({ name: "video", type: "varchar" }) @ApiProperty()
   video: string;

   @Column({ name: "price", type: "decimal" }) @ApiProperty()
   price: number;

   @Column({ name: "sale_price", type: "decimal" }) @ApiProperty()
   salePrice: string;

   @Column({ name: "duration", type: "int" }) @ApiProperty()
   duration: number;

   @Column({ name: "faqs", type: "text" }) @ApiProperty()
   faqs: string;

   @Column({ name: "status", type: "varchar" }) @ApiProperty()
   status: string;

   @Column({ name: "publish_date", type: "datetime" }) @ApiProperty()
   publishDate: Date;

   @Column({ name: "create_user", type: "bigint" }) @ApiProperty()
   createUser: number;

   @Column({ name: "update_user", type: "bigint" }) @ApiProperty()
   updateUser: number;

   @Column({ name: "deleted_at", type: "timestamp" }) @ApiProperty()
   deletedAt: Date;

   @Column({ name: "views", type: "bigint" }) @ApiProperty()
   views: number;

   @Column({ name: "created_at", type: "timestamp" }) @ApiProperty()
   createdAt: Date;

   @Column({ name: "updated_at", type: "timestamp" }) @ApiProperty()
   updatedAt: Date;

   @Column({ name: "default_state", type: "tinyint" }) @ApiProperty()
   defaultState: number;

   @Column({ name: "review_score", type: "decimal" }) @ApiProperty()
   reviewScore: number;

   @Column({ name: "include", type: "text" }) @ApiProperty()
   include: string;

   @Column({ name: "exclude", type: "text" }) @ApiProperty()
   exclude: string;

   @Column({ name: "itinerary", type: "text" }) @ApiProperty()
   itinerary: string;

   @ApiProperty({ isArray: true, type: BlCourseLesson }) lessons: Array<BlCourseLesson>;

}