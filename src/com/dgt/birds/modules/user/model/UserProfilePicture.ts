/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bln_user_profile_pic" })
export default class UserProfilePicture
{
   @PrimaryGeneratedColumn({ type: "bigint" })
   id: number;

   @Column({ name: "userEmail", type: "varchar" })
   userEmail: string;

   @Column({ name: "user_id", type: "varchar" })
   userId: string;

   @Column({ name: "pic_id", type: "varchar" })
   picId: string;

   @Column({ name: "created_at", type: "datetime" })
   createdAt: Date;

   @Column({ name: "updated_at", type: "datetime" })
   updatedAt: Date;

   @Column({ name: "deleted_at", type: "datetime" })
   deletedAt: Date;

   @Column({ name: "modified_by", type: "varchar" })
   modifiedBy: string;

   @Column({ name: "photo_link", type: "varchar" })
   photoLink: string;

}