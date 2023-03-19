/* eslint-disable */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bravo_course_user" })
export default class BravoCourseCategoryUser
{

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "course_id", type: "bigint" })
    courseId: number;

    @Column({ name: "user_id", type: "bigint" })
    userId: number;

    @Column({ name: "active", type: "boolean" })
    active: boolean;

    @Column({ name: "order_id", type: "bigint" })
    orderId: number;

    @Column({ name: "deleted_at", type: "timestamp" })
    deletedAt: Date;

    @Column({ name: "create_user", type: "bigint" })
    createUser: number;

    @Column({ name: "update_user", type: "bigint" })
    updateUser: number;

    @Column({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @Column({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;

}