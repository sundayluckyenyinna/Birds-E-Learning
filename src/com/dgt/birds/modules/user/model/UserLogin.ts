/* eslint-disable */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import LoginBuilder from "../builder/LoginBuilder";


@Entity({ name: "bln_user_login" })
export default class UserLogin
{

    @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
    id: number;

    @Column({ name: "user_id", type: "uuid" })
    userId: string;

    @Column({ name: "user_email", type: "varchar" })
    userEmail: string;

    @Column({ name: "username", type: "varchar" })
    username: string;

    @Column({ name: "created_date", type: "datetime" })
    createdDate: Date;

    @Column({ name: "channel", type: "varchar"})
    channel: string;

    @Column({ name: "auth_token", type: "longtext" })
    loginAuthToken: string;

    @Column({ name: "auth_token_created_date", type: "datetime" })
    loginAuthTokenCreatedDate: Date;

    @Column({ name: "auth_token_exp_date", type: "datetime" })
    loginAuthTokenExpDate: Date;

    @Column({ name: "user_device_id", type: "varchar" })
    userDeviceId;
    static builder = (): LoginBuilder => new LoginBuilder();
}