/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "bln_user_preferences" })
export default class BlUserPreference
{

   @PrimaryGeneratedColumn({ type: "bigint" }) @ApiProperty()
   id: number;

   @Column({ name: "user_id", type: "uuid" }) @ApiProperty()
   userId: string;

   @Column({ name: "user_email", type: "varchar" }) @ApiProperty()
   userEmail: string;

   @Column({ name: "preference_names", type: "simple-json" }) @ApiProperty()
   preferenceNames: Array<string>;
   
   @Column({ name: "created_at", type: "datetime" }) @ApiProperty()
   createdDate: Date;

   @Column({ name: "updated_at", type: "datetime" }) @ApiProperty()
    updatedDate: Date;
}