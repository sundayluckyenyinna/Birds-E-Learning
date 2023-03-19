/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "media_files" })
export default class MediaFile
{
   @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "file_name", type: "varchar" })
   fileName: string;

   @Column({ name: "file_path", type: "varchar" })
   filePath: string;

   @Column({ name: "file_size", type: "varchar" })
   fileSize: string;

   @Column({ name: "file_type", type: "varchar" })
   fileType: string;

   @Column({ name: "file_extension", type: "varchar" })
   fileExtension:string;

   @Column({ name: "create_user", type: "int" })
   createUser: number;

   @Column({ name: "update_user", type: "int" })
   updateUser: number;

   @Column({ name: "deleted_at", type: "timestamp" })
   deletedAt: Date;

   @Column({ name: "app_id", type: "int" })
   appId;

   @Column({ name: "app_user_id", type: "int" })
   appUserId: number;

   @Column({ name: "file_width", type: "int" })
   fileWidth: number;

   @Column({ name: "file_height", type: "int" })
   fileHeight: number;

   @Column({ name: "created_at", type: "timestamp" })
   createdAt: Date;

   @Column({ name: "updated_at", type: "timestamp" })
   updatedAt: Date;

   @Column({ name: "driver", type: "varchar" })
   driver: string;
}